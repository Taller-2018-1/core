import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Detail1E } from '../../Detail1E.service';

@Component({
  selector: 'app-calculateandshow1E',
  templateUrl: './calculateandshow1E.component.html',
  styleUrls: ['./calculateandshow1E.component.css']
})
export class calculateandshow1Ecomponent implements OnInit {
  name  = "Calculo de Indicador 1E";
  description = "Nº de actvidades de difusión en la que el CET participa";
 
  public indicator: Indicator1E;
  
  constructor(private service : Detail1E){
      
  }

  getIndicator() : void {
    this.service.getIndicator1E().subscribe(
        Indicator1E => {
        this.indicator = Indicator1E
      }
    );
  }
  

ngOnInit() {
  this.getIndicator();
}

  

}


export class Indicator1E{
  
    id : number;
    title : string;
    description :  string; 
    resource : Resources[];

    constructor(id: number, title: string, description: string, resource: Resources[]){
      this.id = id;
      this.title = title;
      this.description = description;
      this.resource = resource;

    }
  

}

export class Resources{
  id : number;
  title : string;
  link : string;

  constructor(id : number, title : string, link : string){
    this.id = id;
    this.title = title;
    this.link = link;
  }

}