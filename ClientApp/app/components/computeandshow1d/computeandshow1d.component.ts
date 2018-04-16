import { Component, OnInit, Inject } from '@angular/core';
import { Http } from '@angular/http';

import { Computeandshow1dService } from '../../computeandshow1d.service'

@Component({
  selector: 'computeandshow1d',
  templateUrl: './computeandshow1d.component.html',
  styleUrls: ['./computeandshow1d.component.css']
})
export class ComputeAndShow1dComponent implements OnInit {

    //public indicador1D : Indicador1D;
    public indicator1D : Indicator1D;

    
    constructor(private service : Computeandshow1dService){
      
    }

    getIndicator() : void {
      this.service.getIndicator1D().subscribe(
          indicator1D => {
          this.indicator1D = indicator1D
        }
      );
    }
    

  ngOnInit() {
    this.getIndicator();
  }

}


export class Indicator1D{
  id: string;
  title: string;
  description : string;
  resources : Resource[];

  constructor(id : string, title : string, description : string, resources: Resource[]){
    this.id = id;
    this.title = title;
    this.description = description;
    this.resources = resources;
  }

}

export class Resource{
  id : number;

  constructor(id : number){
    this.id = id;
  }
}
