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
  createUserForm: FormGroup;
  listOfData = [];
  userName: any;
  //表单验证状态
  validateStatus: string;

  isTableLoading = true;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private md5: CryptPassword,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    this.getList();
    this.searchForm = this.fb.group({
      name: [null],
    });
    this.createUserForm = this.fb.group({
      role: [null, [Validators.required]],
      email: [null, [Validators.required]],
      userName: [null, [Validators.required]],
      passWord: [null, [Validators.required]],
      confirm: ['', [this.confirmValidator]],
    });
  }

  showModal(): void {
    this.isVisible = true;
    //this.createUserForm.reset();
  }

  async handleOk(): Promise<void> {
    this.isVisible = false;
    const userForm = this.md5.userEncryptionByMD5(this.createUserForm.value);
    const result = await this.http
      .post<ApiResult>(`${this.baseUrl}/createUser`, userForm)
      .toPromise();
    result.code === 200
      ? this.createMessage('success')
      : this.createMessage('error');
    this.isTableLoading = true;
    this.getList();
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  submitForm() {}

  validateConfirmPassword(): void {
    setTimeout(() =>
      this.createUserForm.controls.confirm.updateValueAndValidity()
    );
  }
  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.createUserForm.controls.passWord.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  async getList() {
    const result = await this.http
      .get<ApiResult>(`${this.baseUrl}/userlist`)
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
    }
  }
  //全局提示
  createMessage(type: string): void {
    this.message.create(type, `This is a message of ${type}`);
  }

  // 删除user
  async removeUser(userId, roleId) {
    console.log(userId, roleId);

    const params = new HttpParams()
      .set('user_id', userId)
      .set('role_id', roleId);
    const result = await this.http
      .delete<ApiResult>(`${this.baseUrl}/removeUser`, {
        params,
      })
      .toPromise();
    console.log(result);
  }
}
