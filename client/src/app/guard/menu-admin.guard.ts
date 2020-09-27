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
    console.log(route.url);

    let isTrue: boolean;
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      const role = currentUser.role;
      if (role === 'admin' || role === 'super_admin') {
        isTrue = true;
      }
    } else {
      // const result = await this.userService.getCurrentUserFrom();
      const result = await this.http
        .get<ApiResult>('api/v1/user/currentUser')
        .toPromise();
      const userName = result.data.userName;
      const userRole = result.data.role;
      const code = result.code;
      if (
        userName &&
        code === 200 &&
        (userRole === 'admin' || userRole === 'super_admin')
      ) {
        this.userService.setCurrentUser(userName);
        isTrue = true;
      } else {
        isTrue = false;
        this.router.navigateByUrl('admin/login');
      }
    }
    return isTrue;
  }

  // canActivateChild(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): true | UrlTree {
  //   console.log(route.url);

  //   return;
  // }
}
