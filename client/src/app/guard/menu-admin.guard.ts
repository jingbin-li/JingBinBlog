import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/coreServices';
@Injectable({ providedIn: 'root' })
export class MenuAdminGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route);
    console.log(state);
    return this.userService.getCurrentUser() === 'admin';
  }
}
