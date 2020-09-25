import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
@Injectable()
export class BaseInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // console.log('所有请求走这里');
    const token = localStorage.getItem('token');
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: token,
        },
      });
      //console.log(token);
      return next.handle(clonedRequest);
    }
  }
}
