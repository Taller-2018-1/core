import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation-buttons',
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.css']
})
export class NavigationButtonsComponent implements OnInit {

  private idIndicatorGroup: number = null;
  private idIndicator: number = null;
  private router: Router;

  constructor(router: Router,
    private route: ActivatedRoute) {
    this.idIndicatorGroup = this.route.snapshot.params.idIndicatorGroup;
    this.idIndicator = this.route.snapshot.params.idIndicator;
    this.router = router;
  }

  ngOnInit() {
  }

  goBack()
  {
    if (this.idIndicatorGroup != null && this.idIndicator != null) {  // If is an indicator-detail view, go back to indicatorGroup view
      this.router.navigateByUrl("indicatorGroup/" + this.idIndicatorGroup);
    }
    else {
      this.router.navigateByUrl("/home"); // Otherwise is an indicator-display view, to back home
    }
  }

  goHome()
  {
    this.router.navigateByUrl("/home");
  }

}
