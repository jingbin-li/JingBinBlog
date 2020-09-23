import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginService } from '../../services/coreServices/login.service';
import { BlogAdminRoutingModule } from './blog-admin.routing';
import {
  ArchivesManagementComponent,
  ArticlesManagementComponent,
  CommentsManagementComponent,
  MessagesManagementComponent,
  StatisticsManagementComponent,
  UsersManagementComponent,
} from './components';
import { LoginModule } from 'src/app/login';

const Modules = [
  CommonModule,
  HttpClientModule,
  NgZorroAntdModule,
  ReactiveFormsModule,
  FormsModule,
  BlogAdminRoutingModule,
  LoginModule,
];
const Components = [
  UsersManagementComponent,
  ArticlesManagementComponent,
  CommentsManagementComponent,
  MessagesManagementComponent,
  ArchivesManagementComponent,
  StatisticsManagementComponent,
];
@NgModule({
  declarations: [...Components],
  imports: [...Modules],
  providers: [LoginService],
  exports: [],
})
export class BlogAdminModule {}
