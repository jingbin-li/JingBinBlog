import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserManagement } from './components/user-management/user-management.component';

const routes: Routes = [{ path: 'user-management', component: UserManagement }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BlogAdminRoutingModule {}
