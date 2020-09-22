import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { UserManagement } from './components/user-management/user-management.component';
import { BlogAdminRoutingModule } from './blog-admin.routing';

const SystemModules = [
  CommonModule,
  HttpClientModule,
  NgZorroAntdModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  declarations: [UserManagement],
  imports: [...SystemModules, BlogAdminRoutingModule],
  providers: [LoginService],
  exports: [],
})
export class BlogAdminModule {}
