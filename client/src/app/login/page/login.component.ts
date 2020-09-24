import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { LoginService, UserService } from '../../services/coreServices';
import { Router } from '@angular/router';
import { CryptPassword } from '../../services/coreServices';
import * as CryptoJS from 'crypto-js';
import { UserLogin } from '../../interface/UserLogin';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  contentTemplate: string;
  visible = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private userService: UserService,
    private cryptoPassword: CryptPassword
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      passWord: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    const logInObj: UserLogin = this.validateForm.value;

    const result = this.cryptoPassword.userEncryptionByMD5(logInObj);
    console.log(result);

    this.loginService.login(result).subscribe((res) => {
      if (res.code === 200) {
        this.visible = true;
        this.contentTemplate = '登录成功';
        this.userService.setCurrentUser(logInObj.userName);
        this.userService.setToken(res.data.token);
        this.router.navigateByUrl('home');
      } else {
        this.visible = true;
        this.contentTemplate = '登录失败';
      }
    });
  }
}
