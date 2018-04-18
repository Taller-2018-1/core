import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Http, Response} from '@angular/http';
import {Indicator} from './components/compute-show1-b/compute-show1-b.component';

@Injectable()
export class ComputeShow1BService 
{

  private url: string = 'api/ComputeShow1B/Indicators';

  constructor(private http : Http) { }

  getIndicator1B() : Observable<Indicator>{
        return this.http.get(this.url).map((res:Response) => { return res.json();} );
  }

}
