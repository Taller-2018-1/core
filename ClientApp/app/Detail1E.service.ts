import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';


import { Indicator1E } from './components/calculateandshow1E/calculateandshow1E.component';

@Injectable()
export class Detail1E {

  private url : string = 'api/Indicator1E/GetIndicator1E';  // URL to web api
  constructor(private http : Http) { }

  getIndicator1E() : Observable<Indicator1E>{
    return this.http.get(this.url)
      .map((res:Response) => { return res.json();});
  }

}
