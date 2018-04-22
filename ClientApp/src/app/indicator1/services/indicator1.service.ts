import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Detail1A } from '../model/Detail1A';
import { Detail1B } from '../model/Detail1B';
import { Detail1D } from '../model/Detail1D';
import { Detail1E } from '../model/Detail1E';

@Injectable()
// TODO: Dev team must properly document this service.
// If the services are not documented, all PRs must be rejected.
// https://angular.io/guide/http
export class Indicator1Service {
  // BASE URL definition
  public static BASE_URL = `api/indicator1`;

  // Route definition
  public static INDEX_DETAILS_1A = `${Indicator1Service.BASE_URL}/Detail1A/Index`;
  public static INDEX_DETAILS_1B = `${Indicator1Service.BASE_URL}/Detail1B/Index`;
  public static INDEX_DETAILS_1D = `${Indicator1Service.BASE_URL}/Detail1D/Index`;
  public static INDEX_DETAILS_1E = `${Indicator1Service.BASE_URL}/Detail1E/Index`;

  constructor(public http: HttpClient) { }
    // Consume de manera asincrona los datos desde la API REST

    // TODO: Devteam, Documentar estas llamadas

    indexDetails1A(): Observable<Detail1A[]> {
      // Solicitud GET al controlador .NET Indicator1A por el método GetDetail
      return this.http.get<Detail1A[]>(Indicator1Service.INDEX_DETAILS_1A);
    }
    indexDetails1B(): Observable<Detail1B[]> {
      // Solicitud GET al controlador .NET Indicator1A por el método GetDetail
      return this.http.get<Detail1B[]>(Indicator1Service.INDEX_DETAILS_1B);
    }
    indexDetails1D(): Observable<Detail1D[]> {
      // Solicitud GET al controlador .NET Indicator1A por el método GetDetail
      return this.http.get<Detail1D[]>(Indicator1Service.INDEX_DETAILS_1E);
    }
    indexDetails1E(): Observable<Detail1E[]> {
      // Solicitud GET al controlador .NET Indicator1A por el método GetDetail
      return this.http.get<Detail1E[]>(Indicator1Service.INDEX_DETAILS_1E);
    }
}
