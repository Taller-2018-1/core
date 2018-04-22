import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';  

import { Registro1E } from '../../components/detail1e/detail1e.component';

@Injectable()
export class Detail1eService {

  constructor(private http: Http) { }
  
  
  getRegistros1E(): Observable<Registro1E[]> {
    let apiUrl = 'api/Indicador1E/LoadRegistro1E';
    return this.http.get(apiUrl)
      .map(res => {
        return res.json().map((item :any) => {
          return new Registro1E(
            item.date,
            item.name,
            item.documentUrl
          );
        });
      });
  }
}
