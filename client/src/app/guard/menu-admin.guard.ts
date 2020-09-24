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
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) return true;
    else return false;
  }
}
