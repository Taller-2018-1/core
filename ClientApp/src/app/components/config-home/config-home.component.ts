import { Component, OnInit } from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs/Observable';


// Models
import { Indicator } from '../../shared/models/indicator';
import { IndicatorGroup } from '../../shared/models/indicatorGroup';

// services
import { IndicatorService } from '../../services/indicator/indicator.service';
import { IndicatorGroupService } from '../../services/indicator-group/indicator-group.service';

@Component({
  selector: 'app-config-home',
  templateUrl: './config-home.component.html',
  styleUrls: ['./config-home.component.css']
})
export class ConfigHomeComponent implements OnInit {

  indicators$: Observable<Indicator[]>;
  indicatorsGroups$: Observable<IndicatorGroup[]>;

  constructor(private indicatorService: IndicatorService,
  private indicatorGroupService: IndicatorGroupService) { }

  ngOnInit() {
    this.indicators$ = this.indicatorService.getIndicators();
    this.indicatorsGroups$ = this.indicatorGroupService.getIndicatorGroups();
  }

}
