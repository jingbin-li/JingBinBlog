import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { NzGridModule } from 'ng-zorro-antd/grid';
import { BaseInterceptor } from '../../services/coreServices/base-interceptor';
import { EditArticlesComponent } from './components/articles-management/edit-articles/edit-articles.component';
import { ArticlesListComponent } from './components/articles-management/articles-list/articles-list.component';
import { EditorModule} from '@tinymce/tinymce-angular'
const Modules = [
  CommonModule,
  HttpClientModule,
  NgZorroAntdModule,
  ReactiveFormsModule,
  FormsModule,
  BlogAdminRoutingModule,
  LoginModule,
  NzGridModule,
  EditorModule
];
const Components = [
  UsersManagementComponent,
  ArticlesManagementComponent,
  CommentsManagementComponent,
  MessagesManagementComponent,
  ArchivesManagementComponent,
  StatisticsManagementComponent,
  EditArticlesComponent,
  ArticlesListComponent
];
@NgModule({
  declarations: [...Components],
  imports: [...Modules],
  providers: [
    LoginService,
    { provide: HTTP_INTERCEPTORS, useClass: BaseInterceptor, multi: true },
  ],
  exports: [],
})
export class BlogAdminModule {}
