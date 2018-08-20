import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpResponse,
  HttpProgressEvent,
  HttpErrorResponse,
  HttpUserEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth/AuthService';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  refreshLock = false;
  refreshThreadLock: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);


  injectToken(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getRawToken()}`
      }
    });
}


  constructor(public auth: AuthService) {}

  // tslint:disable-next-line:max-line-length
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    return next.handle(this.injectToken(request)).catch(error => {
      if (error instanceof HttpErrorResponse) {
        switch ((<HttpErrorResponse>error).status) {
          case 400:
            return this.throwInternalError(error);
          case 401:
            return this.tryToRefreshCredentials(request, next);
        }
      } else {
        return Observable.throw(error);
      }
    });
  }

  tryToRefreshCredentials(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.refreshLock) {
      this.refreshLock = true;
      return this.auth
        .refreshToken()
        .switchMap((tokenAvailable: boolean) => {
          if (tokenAvailable) {
            this.refreshThreadLock.next(tokenAvailable);
            return next.handle(
              this.injectToken(req)
            );
          }
          return this.logoutAction();
        })
        .catch(error => {
          return this.logoutAction();
        })
        .finally(() => {
          this.refreshLock = false;
        });
    } else {
      return this.refreshThreadLock
        .filter(token => token != null).take(1)
        .switchMap(token => {
          return next.handle(this.injectToken(req));
        });
    }
  }

  throwInternalError(error) {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_token') {
        return this.logoutAction();
    }

    return Observable.throw(error);
}

  logoutAction() {
    return Observable.throw('');
  }
}
