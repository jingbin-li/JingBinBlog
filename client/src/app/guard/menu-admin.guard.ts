import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/coreServices';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../interface/ApiResult';
import { Router } from '@angular/router';
@Injectable({ providedIn: 'root' })
export class MenuAdminGuard implements CanActivate {
  constructor(
    private readonly userService: UserService,
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}
  // tslint:disable-next-line: typedef
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isTrue: boolean;
    const currentUser = this.userService.getCurrentUser();
    console.log(currentUser);

    if (
      currentUser &&
      (currentUser.role === 'admin' || currentUser.role === 'super_admin')
    ) {
      isTrue = true;
    } else {
      const result = await this.http
        .get<ApiResult>('api/v1/user/currentUser')
        .toPromise();
      const userName = result.data.userName;
      const code = result.code;
      if (userName && code === 200) {
        this.userService.setCurrentUser(userName);
        isTrue = true;
      } else {
        isTrue = false;
        this.router.navigateByUrl('admin/login');
      }
    }
    return isTrue;
  }
}
