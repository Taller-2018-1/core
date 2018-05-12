import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html',
  styleUrls: ['./result-display.component.css']
})
export class ResultDisplayComponent implements OnInit {
  @Input() indicatorGroups;

  constructor() {
  }

  ngOnInit() {
  }

}
