import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface Credentials {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(public http: Http) {}

  public auth(credentials: Credentials): Observable<boolean> {
    return Observable.create(observer => {
      // this.checkAuth(credentials).subscribe(
      //   response => {
      //     const user = this.newUser(response);
      //     localStorage.setItem('user', user);
      //     observer.next(true);
      //     observer.complete();
      //   },
      //   err => {
      //     observer.error(err);
      //     observer.complete();
      //   }
      // );
      if (credentials.email === 'taller2018@utalca.cl' && credentials.password === 'password') {
        observer.next(true);
        observer.complete();
      } else {
        observer.error(new Error('usuario inválido'));
        observer.complete();
      }
    });
  }

  public signOut() {
    return Observable.create(observer => {
      localStorage.removeItem('user');
      observer.next(true);
      observer.complete();
    });
  }

  public getUser() {
    const object = JSON.parse(localStorage.getItem('user'));
    if (object == null) {
      return false;
    }
    return JSON.parse(localStorage.getItem('user')).user.user;
  }

  private parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

  public newUser(response) {
    const token = response.headers.get('Authorization');
    const user = this.parseJwt(token);
    return JSON.stringify({
      user: user.sub,
      secure: {
        token: token
      }
    });
  }
}
