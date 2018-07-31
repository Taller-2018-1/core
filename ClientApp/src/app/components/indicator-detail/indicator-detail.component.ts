import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Models
import { Document } from '../../shared/models/document';
import { Indicator } from '../../shared/models/indicator';
import { Months } from '../../shared/models/months';
import { RegistryType } from '../../shared/models/registryType';

// Services
import { IndicatorService } from '../../services/indicator/indicator.service';
import { RegistryService } from '../../services/registry/registry.service';
import { IndicatorGroupService } from '../../services/indicator-group/indicator-group.service';
import { SessionService } from '../../services/session/session.service';

// Ngx-Bootstrap
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css'],
})
export class IndicatorDetailComponent implements OnInit {
  router: Router;
  modalRef: BsModalRef;

  // Router params
  idIndicatorGroup: number;
  idIndicator: number;

  // Observables
  public indicator$: Observable<Indicator>;
  public goal$: Observable<number>;
  public value$: Observable<number>;
  public indicatorGroupName$: Observable<string>;

  // Dropdown date filters
  isSpecificYearSelected: boolean;
  isSpecificTrimesterSelected: boolean;
  isSpecificMonthSelected: boolean;
  isSpecificWeekSelected: boolean;
  selectedYear: number;
  selectedTrimester: number;
  selectedMonth: number;
  selectedWeek: number;

  // Allow to use the enum in the html tempalte
  public RegistryType = RegistryType;

  // Chart data
  selectedTypeChart: string;
  typesChart: string[] = [];
  typeDispersion: string[] = [];

  // Document data (for EditDocument)
  public document: Document = null;

  constructor(private service: IndicatorService,
    router: Router,
    private registryService: RegistryService,
    private indicatorGroupService: IndicatorGroupService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private sessionStorage: SessionService) {
    this.idIndicator = this.route.snapshot.params.idIndicator;
    this.idIndicatorGroup = this.route.snapshot.params.idIndicatorGroup;
    this.router = router;
  }

  ngOnInit() {
    this.indicator$ = this.service.getIndicator(this.idIndicator);
    this.updateExternalIndicator();

    this.selectedTypeChart = 'Gráfico de línea'; // default chart type
    this.typesChart = ['Gráfico de barra', 'Gráfico de línea']; // array options chart type
    this.typeDispersion = ['Gráfico de dispersión'];
  }

  updateExternalIndicator() {
    this.indicator$.subscribe((indicator) => {
      if (indicator.registriesType === RegistryType.ExternalRegistry) {
        this.registryService.getRegistriesExternal().subscribe();
      }
    });
  }

  // Called when the editor of goals registers a change
  updateGoal(event) {
    // Verify dropdown selection bottom-up (from week to year)
    if (this.isSpecificWeekSelected) {
      this.goal$ = this.service.getGoalYearWeek(this.idIndicator, this.selectedYear, this.selectedWeek);

    } else if (this.isSpecificMonthSelected) {
      this.goal$ = this.service.getGoalYearMonth(this.idIndicator, this.selectedYear, this.selectedMonth);

    } else if (this.isSpecificTrimesterSelected) {
      this.goal$ = this.service.getGoalYearTrimester(this.idIndicator, this.selectedYear, this.selectedTrimester);

    } else if (this.isSpecificYearSelected) {
      this.goal$ = this.service.getGoalYear(this.idIndicator, this.selectedYear);

    } else {
      this.goal$ = this.service.getGoal(this.idIndicator);
    }
  }

  // Called when the dropdown of filters by date changes
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
    this.indicator$ = this.service.getIndicator(this.idIndicator);
    this.value$ = this.service.calculateSpecificIndicator(this.idIndicator);
    this.goal$ = this.service.getGoal(this.idIndicator);
  }

  updateObservablesSpecificYear() {
    this.indicator$ = this.service.getIndicatorYear(this.idIndicator, this.selectedYear);
    this.value$ = this.service.calculateSpecificIndicatorYear(this.idIndicator, this.selectedYear);
    this.goal$ = this.service.getGoalYear(this.idIndicator, this.selectedYear);
  }

  updateObservablesSpecificTrimester() {
    this.indicator$ = this.service.getIndicatorYearTrimester(this.idIndicator, this.selectedYear, this.selectedTrimester);
    this.value$ = this.service.calculateSpecificIndicatorYearTrimester(this.idIndicator, this.selectedYear, this.selectedTrimester);
    this.goal$ = this.service.getGoalYearTrimester(this.idIndicator, this.selectedYear, this.selectedTrimester);
  }

  updateObservablesSpecificMonth() {
    this.indicator$ = this.service.getIndicatorYearMonth(this.idIndicator, this.selectedYear, this.selectedMonth);
    this.value$ = this.service.calculateSpecificIndicatorYearMonth(this.idIndicator, this.selectedYear, this.selectedMonth);
    this.goal$ = this.service.getGoalYearMonth(this.idIndicator, this.selectedYear, this.selectedMonth);
  }

  updateObservablesSpecificWeek() {
    this.indicator$ = this.service.getIndicatorYearWeek(this.idIndicator, this.selectedYear, this.selectedWeek);
    this.value$ = this.service.calculateSpecificIndicatorYearWeek(this.idIndicator, this.selectedYear, this.selectedWeek);
    this.goal$ = this.service.getGoalYearWeek(this.idIndicator, this.selectedYear, this.selectedWeek);
  }

  selectChart(type: string, indicator: Indicator) {
    if (type === 'Gráfico de barra') {
      this.selectedTypeChart = 'Gráfico de barra'; // change the dropdownlist text
    } else if (type === 'Gráfico de línea') {
      this.selectedTypeChart = 'Gráfico de línea'; // change the dropdownlist text
    } else {
      this.selectedTypeChart = 'Gráfico de dispersión';
    }
  }

  openModalEditDocument(template: TemplateRef<any>, selectedDocument: Document) {
    this.document = selectedDocument;
    this.modalRef = this.modalService.show(template);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

/*   gotoRegistry(registryID: number) {
    this.router.navigateByUrl('/registry/' + registryID);
  }

  gotoAddRegistry() {
    this.router.navigateByUrl('/indicator-add-registry');
  } */

}

