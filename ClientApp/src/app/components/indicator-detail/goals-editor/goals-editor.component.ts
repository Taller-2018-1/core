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

  @Input() public indicator: Indicator = new Indicator();
  @Input() public editGoalModalRef: BsModalRef;

  public goals: Goal[] = [];
  public years: number[] = [];
  public yearMonths: number[][] = [];
  public monthsText: string[] = [];
  public value: number;

  constructor(private service: IndicatorService) {
  }

  ngOnInit() {
    this.goals = this.indicator.goals.sort(this.compareByYearMonth);

    let maxYear = 0;

    for (const goal in this.goals) {

    }
    for (let index = 0; index < this.goals.length; index++) {
      const goal = this.goals[index];
      if (this.years.indexOf(goal.year) === -1) {
        this.years.push(goal.year);
        if (goal.year > maxYear) {
          maxYear = goal.year;
        }
      }
      if (this.yearMonths.indexOf([goal.year, goal.month]) === -1) {
        this.yearMonths.push([goal.year, goal.month]);
      }
    }
    this.yearMonths.forEach(yearMonth => {
      if (yearMonth[0] === maxYear) {
        this.monthsText.push(Months[yearMonth[1]]);
      }
    });

  }

  editGoal() {

    // this.service.editGoal(goal.goalID, value);
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
