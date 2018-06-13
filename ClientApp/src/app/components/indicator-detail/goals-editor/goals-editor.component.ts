import { Component, OnInit, Input, TemplateRef } from '@angular/core';

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
  public static INITIAL_YEAR = 2018;
  public initialYear = GoalsEditorComponent.INITIAL_YEAR;

  @Input() public indicator: Indicator = new Indicator();
  @Input() public modalRef: BsModalRef;

  public goals: Goal[] = [];
  public years: number[] = [];
  // Matrix where the first dimension is the year-INITIAL_YEAR and the second is the month and stores the value
  // Ex: goalsByYearMonth[2][0] stores the value of the goal in January of 2020 (with INITIAL_YEAR = 2018)
  public goalsByYearMonth: number[][] = [];
  public monthsText: string[] = [];
  public initialGoalsByYearMonth: number[][];
  // Enum to be used in the html template
  public Months = Months;

  constructor(private service: IndicatorService) {
  }

  ngOnInit() {
    // List of goals sorted by date
    this.goals = this.indicator.goals.sort(this.compareByYearMonth);

    // List of years
    this.goals.forEach((goal) => {
      if (!this.years.includes(goal.year)) {
        this.years.push(goal.year);
      }
    });

    // List with the values goals in the bi-dimensinal array goalsByYearMonth
    for (let i = 0; i < this.years.length; i++) {
      this.goalsByYearMonth[i] = [];
      for (let j = 0; j < this.goals.length; j++) {
        if (i + GoalsEditorComponent.INITIAL_YEAR === this.goals[j].year) {
          this.goalsByYearMonth[i][j % 12] = this.goals[j].value;
        }
      }
    }

    // Create copy with the values before any change
    // this.initialGoalsByYearMonth = this.goalsByYearMonth.slice();

  }

  addGoal() {
    console.log('addGoal()');
    const largo = this.goalsByYearMonth.length;
    if (this.goalsByYearMonth[largo - 1].length === 12) {
      this.goalsByYearMonth[largo] = [this.goalsByYearMonth[largo - 1][11]];
      this.years.push(this.years.slice(-1).pop() + 1);
    } else {
      const ultimo = this.goalsByYearMonth[largo - 1];
      ultimo.push(ultimo[ultimo.length - 1]);
    }
  }

  saveChanges() {
    const newGoals: Goal[] = [];
    for (let i = 0; i < this.goalsByYearMonth.length; i++) {
      for (let j = 0; j < this.goalsByYearMonth[i].length; j++) {
        let added = false;
        this.goals.forEach((goal) => { // Old Modified Goals
          if (goal.year === i + GoalsEditorComponent.INITIAL_YEAR && goal.month === j) {
            goal.value = this.goalsByYearMonth[i][j];
            this.service.putGoal(goal);
            added = true;
          }
        });
        // PUT the Old Modified Goals (update)
        // this.service.postGoals(this.indicator.indicatorID, this.goals);

        if (!added) { // New Goals
          const newGoal = new Goal();
          newGoal.year = i + GoalsEditorComponent.INITIAL_YEAR;
          newGoal.month = j;
          newGoal.value = this.goalsByYearMonth[i][j];
          newGoal.indicatorID = this.indicator.indicatorID;
          newGoals.push(newGoal);
          console.log('newGoal: ' + newGoal);
        }
        console.log(newGoals);
      }
    }
    // POST the New Goals (add)
    this.service.postGoals(this.indicator.indicatorID, newGoals).subscribe((g) => {
      this.service.getGoalsList(this.indicator.indicatorID).subscribe((goalsList) => {
        this.indicator.goals = goalsList;
        this.goals = goalsList;

        // List of years
    this.goals.forEach((goal) => {
      if (!this.years.includes(goal.year)) {
        this.years.push(goal.year);
      }
    });

    for (let i = 0; i < this.years.length; i++) {
      this.goalsByYearMonth[i] = [];
      for (let j = 0; j < this.goals.length; j++) {
        if (i + GoalsEditorComponent.INITIAL_YEAR === this.goals[j].year) {
          this.goalsByYearMonth[i][j % 12] = this.goals[j].value;
        }
      }
    }
      });
    });
    // GET
    /* this.service.getGoalsList(this.indicator.indicatorID).subscribe((goalsList) => {
      this.indicator.goals = goalsList;
      this.goals = goalsList;
    }); */

    

    this.modalRef.hide();
  }

  closeModal() {
    this.modalRef.hide();
    if (this.initialGoalsByYearMonth.toString() === this.goalsByYearMonth.toString()) {
      // Warning and ask if wanna close and lose the changes (using other modal)
    }
  }

  public compareByYearMonth(first, second): number {
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
}
