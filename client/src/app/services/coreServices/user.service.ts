import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    pragma: 'no-cache',
  }),
  // withCredentials: true
};
@Injectable()
export class UserService {
  public currentUser: any;
  public token = '';
  public setCurrentUser(user: any): void {
    this.currentUser = user;
  }
  public getCurrentUser(): any {
    return this.currentUser;
  }
  public setToken(token: string) {
    localStorage.setItem('token', token);
  }
}
