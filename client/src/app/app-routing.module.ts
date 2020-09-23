import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRoutingModule } from './login';
const routes: Routes = [
  { path: 'admin', redirectTo: 'admin/login' },
  {
    path: 'admin',
    loadChildren: () => import('./login').then((m) => m.LoginModule),
  },
  // {
  //   path:'blog',
  //   loadChildren:()=>
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
