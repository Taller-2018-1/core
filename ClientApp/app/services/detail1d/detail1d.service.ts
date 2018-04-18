import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Http } from '@angular/http';

import 'rxjs/add/operator/map';  

import { Registro1D } from '../../components/detail1d/detail1d.component';

@Injectable()
export class Detail1dService {

  constructor(private http: Http) { }
  
  
  getRegistros1D(): Observable<Registro1D[]> {
    let apiUrl = 'api/Indicador1D/LoadPress1D';
    return this.http.get(apiUrl)
      .map(res => {
        return res.json().map((item :any) => {
          return new Registro1D(
            item.date,
            item.header,
            item.backup
          );
        });
      });
  }
}