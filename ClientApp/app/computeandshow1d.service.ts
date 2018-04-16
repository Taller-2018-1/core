import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Http, Response } from '@angular/http';


import { Indicator1D } from './components/computeandshow1d/computeandshow1d.component';

@Injectable()
export class Computeandshow1dService {

  private url : string = 'api/Computeandshow1d/GetIndicator1D';  // URL to web api

  constructor(private http : Http) { }

  getIndicator1D() : Observable<Indicator1D>{
    return this.http.get(this.url)
      .map((res:Response) => { return res.json();});
  }

}
