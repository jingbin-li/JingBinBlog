import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'admin', redirectTo: 'admin/users' },
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('src/app/modules/blog-admin.module').then(
            (m) => m.BlogAdminModule
          ),
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
