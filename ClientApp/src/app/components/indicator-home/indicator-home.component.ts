import { Component, Inject, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Models
import { IndicatorGroup } from '../../shared/models/indicatorGroup';

// Service
import { IndicatorGroupService } from '../../services/indicator-group/indicator-group.service';

@Component({
  selector: 'app-indicator-home',
  templateUrl: './indicator-home.component.html',
  styleUrls: ['./indicator-home.component.css']
})
export class IndicatorHomeComponent implements OnInit {
  @HostBinding('class') classes = 'wrapper'; // This adds a class to the host container

  public indicatorGroups$: Observable<IndicatorGroup[]>;

  constructor(private service: IndicatorGroupService) {  }

  ngOnInit() {
    this.indicatorGroups$ = this.service.getIndicatorGroups();
  }


}
