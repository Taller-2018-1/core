/* Servicio encargado de consumir la API Rest desde el Controller
 * Indicator1AController de forma asíncrona utilizando Observable.
 * Utilizado por el componente detail1a en detail1a.component.ts.
 */

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Detail1a, Indicator1A } from '../../components/detail1a/detail1a.component';
import 'rxjs/add/operator/map';
import { getBaseUrl } from '../../app.browser.module';
import { isNgTemplate } from '@angular/compiler';

@Injectable()
export class Detail1aService {
  private url : string = 'api/Indicator1A/GetIndicator1A';  // URL to web api

  constructor(private http: Http) {    
  }

  getIndicator1A() : Observable<Indicator1A>{
    return this.http.get(this.url)
      .map((res:Response) => { return res.json();});
  }

  // Consume de manera asincrona los datos desde la API REST
  getDetails(): Observable<Detail1a[]> {    
  // Solicitud GET al controlador .NET Indicator1A por el método GetDetail
    return this.http.get(getBaseUrl() + 'api/Indicator1A/GetDetail')
      .map( (res: Response) => {
        let results = res.json().map( (item: Detail1a) => {          
          return new Detail1a(                  
            item.date,
            item.name,
            item.documenturl
          );
        });
        return results;
      });
  }

  
}
