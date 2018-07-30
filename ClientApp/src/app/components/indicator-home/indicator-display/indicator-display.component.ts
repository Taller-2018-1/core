import { Component, OnInit, Input, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

// Models
import { Indicator } from '../../../shared/models/indicator';
import { Months } from '../../../shared/models/months';
import { RegistryType } from '../../../shared/models/registryType';

// Services
import { RegistryService } from '../../../services/registry/registry.service';
import { IndicatorGroupService } from '../../../services/indicator-group/indicator-group.service';
import { IndicatorGroup } from '../../../shared/models/indicatorGroup';
import { SessionService } from '../../../services/session/session.service';

@Component({
  selector: 'app-indicator-display',
  templateUrl: './indicator-display.component.html',
  styleUrls: ['./indicator-display.component.css']
})

export class IndicatorDisplayComponent implements OnInit {
  @Input() indicatorGroup: IndicatorGroup;

  indicatorResults$: Observable<number[]>;
  goals$: Observable<number[]>;

  isSpecificYearSelected: boolean;
  isSpecificTrimesterSelected: boolean;
  isSpecificMonthSelected: boolean;
  isSpecificWeekSelected: boolean;
  selectedYear: number;
  selectedTrimester: number;
  selectedMonth: number;
  selectedWeek: number;

  constructor(private service: IndicatorGroupService,
    private registryService: RegistryService,
    private sessionService: SessionService,
    private router: Router) {

  }

  ngOnInit() {
    this.updateExternalIndicator();
    this.updateObservables(this.sessionService.getDateFiltersData());
  }

  updateObservables(event) {
    this.updateDropdownDateFiltersValues(event);

    // Verify dropdown selection bottom-up (from week to year)
    if (this.isSpecificWeekSelected) {
      this.updateObservablesSpecificWeek();

    } else if (this.isSpecificMonthSelected) {
      this.updateObservablesSpecificMonth();

    } else if (this.isSpecificTrimesterSelected) {
      this.updateObservablesSpecificTrimester();

    } else if (this.isSpecificYearSelected) {
      this.updateObservablesSpecificYear();

    } else {
      this.updateObservablesAllYears();
    }
  }

  updateDropdownDateFiltersValues(event) {
    this.isSpecificYearSelected = event.isSpecificYearSelected;
    this.isSpecificTrimesterSelected = event.isSpecificTrimesterSelected;
    this.isSpecificMonthSelected = event.isSpecificMonthSelected;
    this.isSpecificWeekSelected = event.isSpecificWeekSelected;
    this.selectedYear = event.selectedYear;
    this.selectedTrimester = event.selectedTrimester;
    this.selectedMonth = event.selectedMonth;
    this.selectedWeek = event.selectedWeek;
  }

  updateObservablesAllYears() {
    this.indicatorResults$ = this.service.calculateIndicatorGroup(this.indicatorGroup.indicatorGroupID);
    this.goals$ = this.service.getGoals(this.indicatorGroup.indicatorGroupID);
  }

  updateObservablesSpecificYear() {
    this.indicatorResults$ = this.service.calculateIndicatorGroupYear(this.indicatorGroup.indicatorGroupID, this.selectedYear);
    this.goals$ = this.service.getGoalsYear(this.indicatorGroup.indicatorGroupID, this.selectedYear);
  }

  updateObservablesSpecificTrimester() {
    this.indicatorResults$ = this.service.calculateIndicatorGroupYearTrimester(this.indicatorGroup.indicatorGroupID,
      this.selectedYear, this.selectedTrimester);
    this.goals$ = this.service.getGoalsYearTrimester(this.indicatorGroup.indicatorGroupID, this.selectedYear, this.selectedTrimester);
  }

  updateObservablesSpecificMonth() {
    this.indicatorResults$ = this.service.calculateIndicatorGroupYearMonth(this.indicatorGroup.indicatorGroupID,
      this.selectedYear, this.selectedMonth);
    this.goals$ = this.service.getGoalsYearMonth(this.indicatorGroup.indicatorGroupID, this.selectedYear, this.selectedMonth);
  }

  updateObservablesSpecificWeek() {
    this.indicatorResults$ = this.service.calculateIndicatorGroupYearWeek(this.indicatorGroup.indicatorGroupID,
      this.selectedYear, this.selectedWeek);
    this.goals$ = this.service.getGoalsYearWeek(this.indicatorGroup.indicatorGroupID, this.selectedYear, this.selectedWeek);
  }

  gotoIndicator(idIndicatorGroup: number, idIndicator: number) {
    this.router.navigateByUrl('/indicator/' + idIndicatorGroup + '/' + idIndicator);
  }

  updateExternalIndicator() {
    this.indicatorGroup.indicators.forEach(indicator => {
      if (indicator.registriesType === RegistryType.ExternalRegistry) {
        this.registryService.getRegistriesExternal().subscribe();
      }
    });
  }
}
