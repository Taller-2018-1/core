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
  private refreshTokenInProgress = false;
  // Refresh Token Subject tracks the current token, or is null if no token is currently
  // available (e.g. refresh pending).
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  injectToken(request: HttpRequest<any>): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getRawToken()}`
      }
    });
  }

  constructor(public auth: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any>  { // HttpEvent<any>
    return next.handle(this.addAuthenticationToken(request)).catch(error => {
      // We don't want to refresh token for some requests like login or refresh token itself
      // So we verify url and we throw an error if it's the case
      if (request.url.includes('renew') || request.url.includes('login')) {
        // We do another check to see if refresh token failed
        // In this case we want to logout user and to redirect it to login page
        if (request.url.includes('renew')) {
          this.auth.logout();
        }

        return Observable.throw(error);
      }

      // If error status is different than 401 we want to skip refresh token
      // So we check that and throw the error if it's the case
      if (error.status !== 401) {
        return Observable.throw(error);
      }

      if (this.refreshTokenInProgress) {
        // If refreshTokenInProgress is true, we will wait until refreshTokenSubject has a non-null value
        // – which means the new token is ready and we can retry the request again
        return this.refreshTokenSubject
          .filter(result => result !== null)
          .take(1)
          .switchMap(() => next.handle(this.addAuthenticationToken(request)));
      } else {
        this.refreshTokenInProgress = true;

        // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
        this.refreshTokenSubject.next(null);

        // Call auth.refreshAccessToken(this is an Observable that will be returned)
        return this.auth
          .refreshToken()
          .switchMap((token: any) => {
            // When the call to refreshToken completes we reset the refreshTokenInProgress to false
            // for the next time the token needs to be refreshed
            this.refreshTokenInProgress = false;
            this.refreshTokenSubject.next(token);

            return next.handle(this.addAuthenticationToken(request));
          })
          .catch((err: any) => {
            this.refreshTokenInProgress = false;
            this.auth.logout();
            return Observable.throw(error);
          });
      }
    });
  }

  public addAuthenticationToken(request) {
    // Get access token from Local Storage
    const accessToken = this.auth.getRawToken();

    // If access token is null this means that user is not logged in
    // And we return the original request
    if (!accessToken) {
      return request;
    }

    // We clone the request, because the original request is immutable
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getRawToken()}`
      }
    });
  }

  // // tslint:disable-next-line:max-line-length
  // intercept(
  //   request: HttpRequest<any>,
  //   next: HttpHandler
  // ): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
  //   return next.handle(this.injectToken(request)).catch(error => {
  //     if (error instanceof HttpErrorResponse) {
  //       switch ((<HttpErrorResponse>error).status) {
  //         case 400:
  //           return this.throwInternalError(error);
  //         case 401:
  //           return this.tryToRefreshCredentials(request, next);
  //       }
  //     } else {
  //       return Observable.throw(error);
  //     }
  //   });
  // }

  // tryToRefreshCredentials(req: HttpRequest<any>, next: HttpHandler) {
  //   if (!this.refreshLock) {
  //     this.refreshLock = true;
  //     return this.auth
  //       .refreshToken()
  //       .switchMap((tokenAvailable: boolean) => {
  //         if (tokenAvailable) {
  //           this.refreshThreadLock.next(tokenAvailable);
  //           return next.handle(this.injectToken(req));
  //         }
  //         return this.logoutAction();
  //       })
  //       .catch(error => {
  //         return this.logoutAction();
  //       })
  //       .finally(() => {
  //         this.refreshLock = false;
  //       });
  //   } else {
  //     return this.refreshThreadLock
  //       .filter(token => token != null)
  //       .take(1)
  //       .switchMap(token => {
  //         return next.handle(this.injectToken(req));
  //       });
  //   }
  // }

  // throwInternalError(error) {
  //   if (error && error.status === 400 && error.error && error.error.error === 'invalid_token') {
  //     return this.logoutAction();
  //   }

  //   return Observable.throw(error);
  // }

  // logoutAction() {
  //   return Observable.throw('');
  // }
}
