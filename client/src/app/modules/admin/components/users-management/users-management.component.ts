import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiResult } from 'src/app/interface/ApiResult';
import { CryptPassword } from '../../../../services/coreServices';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'users-manamgemnet',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.less'],
})
export class UsersManagementComponent implements OnInit {
  baseUrl = 'api/v1/admin';
  isVisible = false;
  searchForm: FormGroup;
  userForm: FormGroup;
  listOfData = [];
  userName: any;
  //表单验证状态
  validateStatus: string;
  //是否禁用ok按钮
  okDisable: true;
  //加载动画
  isTableLoading = true;
  //弹窗类型
  modalType = '';
  passwordLable = '';
  //当前编辑表单对象的userName
  currentFormUser: any;
  //分页
  pager = {
    pageIndex: 1,
    pageSize: 20,
    total: 0,
  };
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private md5: CryptPassword,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    
    this.searchForm = this.fb.group({
      name: [''],
    });
    this.userForm = this.fb.group({
      role: [null, [Validators.required]],
      email: [null, [Validators.required]],
      userName: [null, [Validators.required]],
      passWord: [null, [Validators.required]],
      confirm: ['', [this.confirmValidator]],
    });
    this.getList();
  }

  showModal(type: string, item?: any): void {
    this.modalType = type;
    if (type === 'createUser') {
      this.userForm.reset();
      this.passwordLable = 'Password';
    }
    if (type === 'updateUser') {
      this.passwordLable = 'New password';
      this.currentFormUser = item;
      this.userForm.patchValue({
        role: item.role,
        email: item.email,
        userName: item.userName,
        passWord: null,
      });
    }
    this.isVisible = true;
    //this.createUserForm.reset();
  }
  getIsDisabledOkBtn() {
    if (this.modalType === 'createUser') {
      if (this.userForm.valid && this.validateStatus === 'success') {
        return false;
      }
    }
    if (this.modalType === 'updateUser') {
      const controV = this.userForm.value;
      if (controV.passWord) {
        if (this.userForm.valid) {
          return false;
        } else {
          return true;
        }
      } else {
        if (
          controV.role &&
          controV.email &&
          controV.userName &&
          this.validateStatus === 'success'
        ) {
          return false;
        }
      }
    }
    return true;
  }
  async handleOk(): Promise<void> {
    this.isVisible = false;
    this.isTableLoading = true;
    let result;
    if (this.modalType === 'createUser') {
      const userForm = this.md5.userEncryptionByMD5(this.userForm.value);
      result = await this.http
        .post<ApiResult>(`${this.baseUrl}/createUser`, userForm)
        .toPromise();
    }
    if (this.modalType === 'updateUser') {
      let userFormResult = this.userForm.value;
      userFormResult.user_id = this.currentFormUser.user_id;
      userFormResult.role_id = this.currentFormUser.role_id;
      userFormResult = this.md5.userEncryptionByMD5(userFormResult);
      result = await this.http
        .post<ApiResult>(`${this.baseUrl}/updateUser`, userFormResult)
        .toPromise();
    }
    result.code === 200
      ? this.createMessage('success')
      : this.createMessage('error');
    this.getList();
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  search() {
    this.isTableLoading = true;
    this.getList();
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.userForm.controls.confirm.updateValueAndValidity());
  }
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.userForm.controls.passWord.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  async getList() {
  //  const { pageIndex, pageSize, total } = this.pager;
    const { name } = this.searchForm.value;
    const params = new HttpParams()
      // .set('pageIndex', pageIndex.toString())
      // .set('pageSize', pageSize.toString())
      // .set('toal', total.toString())
      .set('name', name);
    const result = await this.http
      .get<ApiResult>(`${this.baseUrl}/userlist`, { params })
      .toPromise();
    this.listOfData = result.data;
    console.log(this.listOfData);
    this.isTableLoading = false;
  }

  //验证名字是否已经被注册了
  async checkName(value) {
    const params = new HttpParams().set('userName', value);
    const result = await this.http
      .get<ApiResult>(`${this.baseUrl}/checkName`, { params })
      .toPromise();
    const checkRes = result.data;
    if (result.code === 200 && !checkRes.isExist) {
      this.validateStatus = 'success';
    } else {
      this.validateStatus = 'error';
      if (
        this.modalType === 'updateUser' &&
        value === this.currentFormUser.userName
      ) {
        this.validateStatus = 'success';
      }
    }
  }
  //全局提示
  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`);
  }

  // 删除user
  async removeUser(userId, roleId) {
    const params = new HttpParams()
      .set('user_id', userId)
      .set('role_id', roleId);
    const result = await this.http
      .delete<ApiResult>(`${this.baseUrl}/removeUser`, {
        params,
      })
      .toPromise();
    if (result.code === 200) {
      this.isTableLoading = true;
      this.createMessage('success');
      this.getList();
    } else {
      this.createMessage('error');
    }
  }
}
