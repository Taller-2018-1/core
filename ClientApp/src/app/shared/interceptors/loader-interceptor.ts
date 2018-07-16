// src/app/auth/jwt.interceptor.ts
// ...
import 'rxjs/add/operator/do';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader/loader.service';
import { Injectable } from '@angular/core';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(public loader: LoaderService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        this.loader.pop("goto purr");
      }
      else {
        this.loader.push("goto purr");
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // redirect to the login route
          // or show a modal
        }
      }
    });
  }
}
