import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Indicator1Service } from '../../services';
import { Detail1E } from '../../model';

@Component({
  selector: 'app-indicator1-detail1e',
  templateUrl: './detail1e.component.html',
  styleUrls: ['./detail1e.component.css']
})
export class Detail1EComponent implements OnInit {

  public registros: Observable<Detail1E[]>;

  constructor(private indicator1Service: Indicator1Service) {
  }

  ngOnInit() {
    this.registros = this.indicator1Service.indexDetails1E();
  }
}
