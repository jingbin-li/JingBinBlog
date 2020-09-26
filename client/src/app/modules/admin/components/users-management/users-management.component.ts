import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from 'src/app/interface/ApiResult';
import { CryptPassword } from '../../../../services/coreServices';
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
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private md5: CryptPassword
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
    console.log(this.createUserForm.value);
    const userForm = this.md5.userEncryptionByMD5(this.createUserForm.value);
    console.log(userForm);

    const result = await this.http
      .post<ApiResult>(`${this.baseUrl}/createUser`, userForm)
      .toPromise();
    console.log(result);
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
    console.log(result.data);

    this.listOfData = result.data;
  }
}
