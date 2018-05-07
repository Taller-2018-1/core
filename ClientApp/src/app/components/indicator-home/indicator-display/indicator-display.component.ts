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
  selectionYear: string; // Default selection = currentYear (defined in ngOnInit)
  selectionMonth: 'Todos los meses'; // Default selection
  years: number[] = []; // List of the years from baseYear to currentYear (defined in ngOnInit)
  months: number[] = []; // List of the months from 0 (January) to the current month (defined in ngOnInit)
  monthsOfTheYear: string[] = []; // List with the list of the months of the selected year (defined in ngOnInit)

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
    this.selectionYear = 'Año ' + currentYear;

    const currentMonth = new Date().getMonth(); // 0 = Juanuary, 1 = February, ..., 11 = December
    for (let i = 0; i <= currentMonth; i++) {
      this.months[i] = i;
    }
    this.setMonthsOfTheYear();

  }

  calculateIndicadors(year: any, month: any) {
    if (year === 'Todos los años') {
      this.indicatorResults$ = this.service.calculateIndicators();
      this.selectionYear = year;
    } else {
      this.indicatorResults$ = this.service.calculateIndicatorsYear(year);
      this.selectionYear = 'Año ' + year;
    }
  }

  setMonthsOfTheYear() {
    this.months.forEach(month => {
      switch (month) {
        case 0:
          this.monthsOfTheYear.concat('Enero');
          break;
        case 1:
          this.monthsOfTheYear.concat('Febrero');
          break;
        case 2:
          this.monthsOfTheYear.concat('Marzo');
          break;
        case 3:
          this.monthsOfTheYear.concat('Abril');
          break;
        case 4:
          this.monthsOfTheYear.concat('Mayo');
          break;
        case 5:
          this.monthsOfTheYear.concat('Junio');
          break;
        case 6:
          this.monthsOfTheYear.concat('Julio');
          break;
        case 7:
          this.monthsOfTheYear.concat('Agosto');
          break;
        case 8:
          this.monthsOfTheYear.concat('Semptiembre');
          break;
        case 9:
          this.monthsOfTheYear.concat('Octubre');
          break;
        case 10:
          this.monthsOfTheYear.concat('Noviembre');
          break;
        case 11:
          this.monthsOfTheYear.concat('Diciembre');
          break;
      }
    });
  }
}
