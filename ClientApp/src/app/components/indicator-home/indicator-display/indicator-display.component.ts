import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DecimalPipe } from '@angular/common';

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
  @Input() indicatorGroup;
  indicatorResults$: Observable<number[]>;
  selection = 'Todos los años';
  years: number[] = []; // List of the years from baseYear to currentYear (defined in ngOnInit)

  constructor(private service: IndicatorService) {
  }

  ngOnInit() {
    this.indicatorResults$ = this.service.calculateIndicators();

    // Create the list of years from baseYear to currentYear
    const baseYear = 2018;
    const currentYear = new Date().getFullYear();
    for (let i = 0; i <= (currentYear - baseYear); i++) {
        this.years[i] = baseYear + i;
    }
  }

  calcularIndicadores(value: any) {
    if (value === 'Todos los años') {
      this.indicatorResults$ = this.service.calculateIndicators();
      this.selection = value;
    } else {
      this.indicatorResults$ = this.service.calculateIndicatorsYear(value);
      this.selection = 'Año ' + value;
    }

  }

}
