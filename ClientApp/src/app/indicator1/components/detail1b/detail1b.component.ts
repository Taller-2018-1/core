import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Indicator1Service } from '../../services';
import { Detail1B } from '../../model';

@Component({
  selector: 'app-indicator1-detail1b',
  templateUrl: './detail1b.component.html',
  styleUrls: ['./detail1b.component.css']
})
export class Detail1BComponent implements OnInit {

  public details: Observable<Detail1B[]>;

  constructor(private indicator1Service: Indicator1Service) {
  }

  ngOnInit() {
    this.details = this.indicator1Service.getDetails1B();
  }
}
