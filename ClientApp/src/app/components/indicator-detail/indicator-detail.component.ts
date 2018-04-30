import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Models
import { Indicator } from '../../shared/models/indicator';
import { IndicatorType } from '../../shared/models/indicatorType';

// Services
import { IndicatorService } from '../../services/indicator/indicator.service';

@Component({
  selector: 'app-indicator-detail',
  templateUrl: './indicator-detail.component.html',
  styleUrls: ['./indicator-detail.component.css']
})
export class IndicatorDetailComponent implements OnInit {

  public indicator$: Observable<Indicator>;
  private idIndicator = -1;   // Variable that will hold the value of the indicator's ID

  constructor(private route: ActivatedRoute, private service: IndicatorService) {
    // Obtain the indicator's ID from the url (Eg: localhost:5000/indicator/1)
    this.idIndicator = this.route.snapshot.params.idIndicator;
  }

  ngOnInit() {
    // Load the details of the specific indicator (using its ID)
    this.indicator$ = this.service.getIndicator(this.idIndicator);
  }

}
