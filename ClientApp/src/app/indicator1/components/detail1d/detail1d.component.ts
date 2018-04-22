import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Detail1D } from '../../model';
import { Indicator1Service } from '../../services';

@Component({
  selector: 'app-indicator1-detail1d',
  templateUrl: './detail1d.component.html',
  styleUrls: ['./detail1d.component.css']
})
export class Detail1DComponent implements OnInit {

  public press: Observable<Detail1D[]>;

  constructor(private indicator1Service: Indicator1Service) {
  }

  ngOnInit() {
    this.press = this.indicator1Service.getDetails1D();
  }
}
