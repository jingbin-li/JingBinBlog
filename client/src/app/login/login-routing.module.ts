import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './page/login.component';

const routes: Routes = [
  { path: 'login', redirectTo: 'admin/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: '登录', pageName: 'login' },
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
