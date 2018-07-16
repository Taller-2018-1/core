import { ActivatedRoute } from '@angular/router';
import { Component, Inject, OnInit, HostBinding } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Model
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

  indicatorGroup$: Observable<IndicatorGroup>;
  //  indicatorGroup: IndicatorGroup;
  // public idIndicatorGroup = -1;

  constructor(private service: IndicatorGroupService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.indicatorGroup$ = this.service.getIndicatorGroup(this.route.snapshot.params.idIndicatorGroup);
    // this.indicatorGroup$.subscribe(data => this.indicatorGroup = data);
  }

}
