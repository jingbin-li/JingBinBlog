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
    this.loginService.login(result).subscribe((res) => {
      if (res.code === 200) {
        const { jwt, role: userRole } = res.data;
        if (userRole.role === 'admin' || userRole.role === 'super_admin') {
          this.visible = true;
          this.userService.setCurrentUser({
            userName: logInObj.userName,
            role: userRole.role,
          });
          this.userService.setToken(jwt);
          this.router.navigateByUrl('home');
        } else {
          this.visible = true;
          this.contentTemplate = '登录失败';
        }
      } else {
        this.visible = true;
        this.contentTemplate = '登录失败';
      }
    });
  }
}
