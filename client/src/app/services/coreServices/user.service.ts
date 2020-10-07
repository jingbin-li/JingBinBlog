import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ApiResult } from 'src/app/interface/ApiResult';

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
  constructor(private http: HttpClient) {}
  public setCurrentUser(user: any): void {
    this.currentUser = user;
  }
  public getCurrentUser(): {userName:string;role:string} {
    return this.currentUser;
  }
  public setToken(token: string) {
    localStorage.setItem('token', token);
  }
  public async getCurrentUserFrom() {
    const result = await this.http
      .get<ApiResult>('api/v1/user/currentUser')
      .toPromise();

    return result.data;
  }
}
