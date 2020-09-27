import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuAdminGuard } from '../guard/menu-admin.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', redirectTo: 'home/users' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/modules/admin/blog-admin.module').then(
            (m) => m.BlogAdminModule
          ),
      },
    ],
    canActivate: [MenuAdminGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
