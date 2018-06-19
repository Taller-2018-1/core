import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Models
import { Goal } from '../../../shared/models/goal';
import { Indicator } from '../../../shared/models/indicator';
import { Months } from '../../../shared/models/months';

// Ngx-Bootstrap
import { BsModalRef } from 'ngx-bootstrap/modal';
import { IndicatorService } from '../../../services/indicator/indicator.service';

@Component({
  selector: 'app-goals-editor',
  templateUrl: './goals-editor.component.html',
  styleUrls: ['./goals-editor.component.css']
})
export class GoalsEditorComponent implements OnInit {
  public static YEAR_TEXT = 'Año ';
  public static INITIAL_YEAR = 2018;

  // Static values used in the view
  public yearText = GoalsEditorComponent.YEAR_TEXT;
  public initialYear = GoalsEditorComponent.INITIAL_YEAR;

  // Inputs
  @Input() public indicator: Indicator = new Indicator();
  @Input() public modalRef: BsModalRef;

  // Dropdown
  public years: number[] = [];
  public selectedYearText: string;
  public selectedYear: number;
  // Enum to be used in the html template
  public Months = Months;
  // Allow use of Math in html template
  public Math = Math;
  // Form
  public form: FormGroup;
  public requiredError = 'Este campo es obligatorio';
  public patternErrorNatural = 'El valor debe ser un número positivo';
  public patternErrorDecimal = 'El valor debe ser un número positivo con hasta 2 decimales';

  constructor(private service: IndicatorService,
    private fb: FormBuilder) {
      this.createForm();
  }

  ngOnInit() {
    // List of goals sorted by date
    this.indicator.goals = this.getSortedGoals();

    // Initialize the list of years according to the goals array
    this.initYears();

    // The last year is selected by default
    this.setSelectedYear(this.years.length - 1);

    // Set the data initial data of the form
    this.rebuildForm();
  }

  // Adds a new goal, with the same value of the last added goal
  addGoal() {
    // Copy the last added value to the new value
    const lastIndex = this.monthlyGoals.controls.length - 1;
    const last = this.monthlyGoals.get(lastIndex.toString()).value['month'];
    console.log(last);

    // Add a new field to the form using the value of the previously added goal
    this.addMonthlyGoal(last);

    // Add a new year when it's necessary (every 12 inputs inserted)
    if ((this.monthlyGoals.length / 12) > this.years.length) {
      this.years.push(this.years.slice(-1).pop() + 1);
    }

    // Set the last year as selected
    this.setSelectedYear(this.years.length - 1);
  }

  // Close the modal, save the changes in the model and the DB and rebuild the form with the new values
  saveChanges() {
    this.modalRef.hide();

    // Save changes


    this.rebuildForm(); // Uses the already saved values of the indicator's goals
  }

  // Close the modal and rebuild the form with the previous values
  revertChanges() {
    this.modalRef.hide();
    this.rebuildForm();
  }

  // If there are changes, it opens a new modal asking if save or revert the changes
  closeModal() {
    this.modalRef.hide();
    // Warning and ask if wanna close and lose the changes (using other modal)
  }

  // Set the selectedYear and selectedYearText by the index in the years array
  setSelectedYear(index: number) {
    this.selectedYear = this.years[index];
    this.selectedYearText = GoalsEditorComponent.YEAR_TEXT + this.selectedYear;
  }

  // Initialize the years array using the goals array
  initYears() {
    this.indicator.goals.forEach((goal) => {
      if (!this.years.includes(goal.year)) {
        this.years.push(goal.year);
      }
    });
  }

  // Returns the goals array (of the indicator) sorted by date
  getSortedGoals(): Goal[] {
    return this.indicator.goals.sort(this.compareByYearMonth);
  }

  // Function to order the goals array by date
  compareByYearMonth(first, second): number {
    if (first.year === second.year && first.month === second.month) {
      return 0;
    }
    if (first.year < second.year) {
      return -1;
    }
    if (first.year === second.year && first.month < second.month) {
      return -1;
    }
    return 1;
  }

  /* ReactiveForm Functions */

  // Create the base form (without data)
  createForm() {
    this.form = this.fb.group({
      monthlyGoals: this.fb.array([])
    });
  }

  // Reset the status of the inputs and set the data based in the goals array
  rebuildForm() {
    this.form.reset({
      monthlyGoals: this.fb.array([])
    });
    this.setMonthlyGoals(this.indicator.goals);
  }

  // Property to obtain the monthlyGoals FormArray easily
  // Use: this.monthlyGoals
  get monthlyGoals(): FormArray {
    return this.form.get('monthlyGoals') as FormArray;
  }

  // Set the values of the form using an array of goals
  setMonthlyGoals(goals: Goal[]) {
    goals.forEach((goal) => {
      this.addMonthlyGoal(goal.value.toString());
    });
  }

  // Adds a new field in the form with a value
  addMonthlyGoal(value: string) {
    // If the registries aren't PercentRegistry, it allows natural numbers (including 0
    if (this.indicator.registriesType !== 2) {
      this.monthlyGoals.push(this.fb.group({
        month: [value, [Validators.required, Validators.pattern('[0-9]{1,}')]]
      }));
    } else { // Else, it allows decimal numbers (with max. 2 decimals)
      this.monthlyGoals.push(this.fb.group({
        month: [value, [Validators.required, Validators.pattern('[0-9]{1,}([\.][0-9]{1,2}){0,1}')]]
      }));
    }
  }

}

