import { Component, OnInit } from '@angular/core';
import { Detail1eService } from '../../services/detail1e/detail1e.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-detail1e',
  templateUrl: './detail1e.component.html',
  styleUrls: ['./detail1e.component.css']
})
export class Detail1eComponent implements OnInit {

  public registros: Observable<Registro1E[]>;
  private loading: boolean = false;

  constructor(private detalleService: Detail1eService) { 
    this.loading = true;
    this.registros = this.detalleService.getRegistros1E();
  }

  ngOnInit() {
    this.doLoad();
  }

  doLoad() {
    
  }  
}

export class Registro1E {
  date: string;
  name: string;
  source: string;
  
  constructor(date: string, name: string, source: string) {
      this.date = date;
      this.name = name;
      this.source = source;
  }
    
}