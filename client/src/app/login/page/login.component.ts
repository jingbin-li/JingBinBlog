import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService, UserService } from '../../services/coreServices';
import { Router } from '@angular/router';
import { CryptPassword } from '../../services/coreServices';
import * as CryptoJS from 'crypto-js';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup;

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
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    const result = this.cryptoPassword.userEncryptionByMD5(
      this.validateForm.value
    );
    console.log(result);
    this.loginService.login(result).subscribe((res) => {
      console.log(res);
    });
    //this.userService.setCurrentUser('admin');
    this.router.navigateByUrl('home');
  }
}
