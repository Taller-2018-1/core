import { Component, OnInit } from '@angular/core';
import { Detail1dService } from '../../services/detail1d/detail1d.service';
import { Observable } from 'rxjs/Observable';
import { getBaseUrl } from '../../app.browser.module';
import { Http } from '@angular/http';

@Component({
  selector: 'app-detail1d',
  templateUrl: './detail1d.component.html',
  styleUrls: ['./detail1d.component.css'],
  providers: [Detail1dService]
})
export class Detail1dComponent implements OnInit {

  public press: Observable<Registro1D[]>;
  private loading: boolean = false;

  constructor(private detalleService: Detail1dService)
  { 
    this.loading = true;
    this.press = this.detalleService.getRegistros1D();
  }

  ngOnInit() 
  {
    this.doLoad();
  }

  doLoad(){}

}


export class Registro1D {
  date: string;
  header: string;
  backup: string;
  
  constructor(date: string, header: string, backup: string) {
      this.date = date;
      this.header = header;
      this.backup = backup;
  }
    
}
