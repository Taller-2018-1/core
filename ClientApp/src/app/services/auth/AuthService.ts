import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../alerts/notification.service';
import { PermissionClaim } from './permissions';
import { User } from './User';
import { Role } from '../../shared/models/role';

export interface Credentials {
  email: string;
  password: string;
}

export interface RefreshTokenQuery {
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(private http: HttpClient, private router: Router, private notifications: NotificationService) {
  }

  private static AUTHORIZATION_API = '/api/auth/';
  private static ROLE_API = '/api/Roles/';
  private self_token = null;
  private role: Role = null;

  public auth(credentials: Credentials): Observable<boolean> {
    return Observable.create(observer => {
      return this.http.post<any>(AuthService.AUTHORIZATION_API, credentials).subscribe(
        (data: any) => {
          // success path
          const token: string = data.token;
          localStorage.setItem('token', token);
          this.notifications.showToaster('Sesión iniciada', 'success');
          this.self_token = this.getToken();
          this.roleLoadRequest().subscribe(data => {
            this.setLocalRole(data);
            this.role = this.getRole();
            observer.next(true)
            observer.complete();
            this.router.navigate(['/home']);
          } );
        },
        error => {
          // error path
          this.logout();
          observer.error(new Error('usuario inválido'));
          this.notifications.showToaster('Usuario inválido', 'error');
          observer.complete();
        }
      );
    });
  }

  public logout() {
    sessionStorage.clear();
    localStorage.setItem('token', null);
    this.router.navigate(['/welcome']);
    this.self_token = null;
  }

  public loadRole() {
    this.roleLoadRequest().subscribe(data => {
      this.setLocalRole(data);
    });
   
  }

  private roleLoadRequest(){
    return this.http.get<Role>(AuthService.ROLE_API + (this.getUser() as User).role_ids)
  }

  public refreshToken(): Observable<string> {
    return Observable.create(observer => {
      return this.http.post<any>(`${AuthService.AUTHORIZATION_API}renew`, {refreshToken: (this.getUser() as User).refreshToken}).subscribe(
        (data: any) => {
          // success path
          const token: string = data.token;
          localStorage.setItem('token', token);
          observer.next(token);
          observer.complete();
          this.loadRole();
        },
        error => {
          // error path
          this.logout();
          observer.error(new Error('Sesión inválida'));
          this.notifications.showToaster('Sesión inválida', 'error');
          observer.complete();
        }
      );
    });
  }

  /*
  // came with this idea while listening https://www.youtube.com/watch?v=4NrJ1C4sKr8 and drinking some vodka <3
  public isAllowedTo(target: PermissionTarget, claim: PermissionClaim): boolean {
    const token = <any>this.getToken();
    if (token.reads && claim === PermissionClaim.READ) {
      return token.reads.indexOf(target) > -1;
    } else if (token.writes && claim === PermissionClaim.WRITE) {
      return token.writes.indexOf(target) > -1;
    }
    return false;
  }
  */

  // came with this idea while sober <3
  public isAllowedTo(indicatorId: number, claim: PermissionClaim): boolean {
    //When the page is reloaded this.role == null | undefined.
    if(this.role === null || this.role === undefined){
      this.role = this.getRole();
    }
    
    //if this.role ended as null. is because we have no role on session memory
    if(!this.role){
      return false;
    }

    if (claim === PermissionClaim.WRITE) {
      for (const permission of  this.role.permissionsWrite) {
        if (permission.indicatorID === indicatorId) {
          return true;
        }
      }
      return false;
    } else {
      for (const permission of this.role.permissionsRead) {
        if (permission.indicatorID === indicatorId) {
          return true;
        }
      }
      return false;
    }
  }

  public roleIsAllowedTo(roleId: string, indicatorId: number, claim: PermissionClaim): Observable<Role> {
    return this.http.get<Role>(AuthService.ROLE_API + roleId);
  }


  public signOut() {
    return Observable.create(observer => {
      sessionStorage.clear();
      localStorage.removeItem('token');
      observer.next(true);
      observer.complete();
      this.notifications.showToaster('Sesión finalizada', 'info');
      this.self_token = null;
      this.role = null;
    });
  }

  private getLocalRole(): Role {
    const user: any = this.getUser();
    if(!user){
      return null;
    }
    const user_role = sessionStorage.getItem(JSON.stringify(user.role_ids));
    if (!user_role || user_role === 'null') {
      return null;
    } else {
      return JSON.parse(user_role);
    }
  }

  private setLocalRole(role: Role){
    const user = this.getUser();
    if (typeof user !== 'boolean') {
      sessionStorage.setItem(JSON.stringify(user.role_ids), JSON.stringify(role));
    }
  }

  public getRole(): Role {
    const local_role = this.getLocalRole();
    // Check if there isn't a role stored
    if(!local_role) { 
        return null; 
    }
    else {
        return local_role;
    }
  }

  public getUser(): User | boolean {
    const user: any = this.getToken();
    if (user !== false) {
      return user;
    }
    return false;
  }

  public getToken(): String | boolean {
    const raw_token = this.getRawToken();
    if (typeof raw_token !== 'string') {
      return false;
    }
    const secure_token: string = this.parseJwt(raw_token);
    if (secure_token == null) {
      return false;
    }
    return secure_token;
  }

  public getRawToken(): String | boolean {
    const raw_token = localStorage.getItem('token');
    if (!raw_token || raw_token === 'null') {
      return false;
    } else {
      return raw_token;
    }
  }

  private parseJwt(raw_token: string) {
    let base64Url: string;
    base64Url = (raw_token + '').split('.')[1];
    let base64: string;
    base64 = (base64Url + '').replace('-', '+');
    base64 = (base64 + '').replace('_', '/');
    return JSON.parse((<any>window).atob(base64 + ''));
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
