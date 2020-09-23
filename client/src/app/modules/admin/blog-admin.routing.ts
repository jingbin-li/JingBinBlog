import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuAdminGuard } from 'src/app/guard/menu-admin.guard';
import {
  ArchivesManagementComponent,
  ArticlesManagementComponent,
  CommentsManagementComponent,
  MessagesManagementComponent,
  UsersManagementComponent,
} from './components';

const routes: Routes = [
  {
    path: 'users',
    component: UsersManagementComponent,
    data: { title: '用户管理' },
    canActivate: [MenuAdminGuard],
  },
  {
    path: 'articles',
    component: ArticlesManagementComponent,
    data: { title: '文章管理' },
  },
  {
    path: 'comments',
    component: CommentsManagementComponent,
    data: { title: '评论管理' },
  },
  {
    path: 'messages',
    component: MessagesManagementComponent,
    data: { title: '留言管理' },
  },
  {
    path: 'archives',
    component: ArchivesManagementComponent,
    data: { title: '归档管理' },
  },
  {
    path: 'statistics',
    component: ArchivesManagementComponent,
    data: { title: '网站统计' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogAdminRoutingModule {}
