import { Injectable } from '@angular/core';
import {Role} from '../../shared/models/role';
import {Indicator} from '../../shared/models/indicator';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RoleService {

  private static API_URL = '/api/Roles/';
  private static READ = '/Permission/Read';
  private static WRITE = '/Permission/Write';

  constructor(private http: HttpClient) { }

  addPermissionRead(roleId: string, indicator: Indicator): Observable<Role> {
    return this.http.post<Role>(RoleService.API_URL + roleId + RoleService.READ, indicator);
  }

  addPermissionWrite(roleId: string, indicator: Indicator): Observable<Role> {
    return this.http.post<Role>(RoleService.API_URL + roleId + RoleService.WRITE, indicator);
  }
}
