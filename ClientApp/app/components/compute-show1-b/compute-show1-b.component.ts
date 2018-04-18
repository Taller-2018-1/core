import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';

import {ComputeShow1BService} from '../../compute-show1-b.service';
@Component({
  selector: 'app-compute-show1-b',
  templateUrl: './compute-show1-b.component.html',
  styleUrls: ['./compute-show1-b.component.css']
})
export class ComputeShow1BComponent implements OnInit {
  public indicator: Indicator;

  constructor(private service:ComputeShow1BService)
  {

  }
  /*constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
    http.get(baseUrl + 'api/CalcularMostrar1B/Indicadores').subscribe(result => {
        this.indicador = result.json() as Indicador;
    }, error => console.error(error));
}*/

  ngOnInit() 
  {
    this.getIndicator1B();
  }

  getIndicator1B():void
  {
      this.service.getIndicator1B().subscribe(
        Indicator => {
          this.indicator=Indicator;
        }
      );
  }

}

export class Indicator 
{
  id : number;
  title : string;
  description : string;
  resources : Resources[];
}

interface Resources
{
  id: number;
  dateCreate:string;
  title : string;
  link : string;
  
}
