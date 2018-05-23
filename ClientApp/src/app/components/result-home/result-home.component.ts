import { Component, Inject, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Model
import { IndicatorGroup } from '../../shared/models/indicatorGroup';

// Service
import { IndicatorGroupService } from '../../services/indicator-group/indicator-group.service';

@Component(
{
  selector: 'app-result-home',
  templateUrl: './result-home.component.html',
  styleUrls: ['./result-home.component.css']
})
export class ResultHomeComponent implements OnInit {
  @HostBinding('class') classes = 'wrapper'; // This adds a class to the host container

  public indicatorGroups$: Observable<IndicatorGroup[]>;

  constructor(private service: IndicatorGroupService) {
  }

  ngOnInit() {
    this.indicatorGroups$ = this.service.getIndicatorGroups();
  }


}
