import { NgModule } from '@angular/core';
import { LoginComponent } from './page/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from '../services/coreServices/login.service';
import { CryptPassword } from '../services/coreServices/cryptoPassword.service';
const SystemModules = [
  CommonModule,
  HttpClientModule,
  NgZorroAntdModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  declarations: [LoginComponent],
  imports: [...SystemModules, LoginRoutingModule],
  providers: [LoginService, CryptPassword],
  exports: [LoginComponent],
})
export class LoginModule {}
