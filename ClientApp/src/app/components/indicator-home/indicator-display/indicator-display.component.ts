import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

// Model
import { IndicatorGroup } from '../../../shared/models/indicatorGroup';

@Component({
  selector: 'app-indicator-display',
  templateUrl: './indicator-display.component.html',
  styleUrls: ['./indicator-display.component.css']
})

export class IndicatorDisplayComponent {
  @Input() indicatorResultsObservable: Observable<number[]>;
  @Input() goalsObservable: Observable<number[]>;
  @Input() indicatorGroup: IndicatorGroup;

  constructor(private router: Router) {
  }

  gotoIndicator(idIndicatorGroup: number, idIndicator: number) {
    this.router.navigateByUrl('/indicator/' + idIndicatorGroup + '/' + idIndicator);
  }

}
