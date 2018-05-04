import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Models
import { Indicator } from '../../../shared/models/indicator';

// Service
import { IndicatorService } from '../../../services/indicator/indicator.service';

@Component({
  selector: 'app-indicator-display',
  templateUrl: './indicator-display.component.html',
  styleUrls: ['./indicator-display.component.css']
})
export class IndicatorDisplayComponent implements OnInit {
  @Input() indicatorGroups;
  indicatorResults$: Observable<number[]>;


  constructor(private service: IndicatorService) {
  }

  ngOnInit() {
    this.indicatorResults$ = this.service.calculateIndicators();
  }

}
