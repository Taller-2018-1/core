import { Component, OnInit } from '@angular/core';
import { Indicator } from '../../shared/models/indicator';
import { IndicatorType } from '../../shared/models/indicatorType';
import { IndicatorService } from '../../services/indicator/indicator.service';
import { Registry } from '../../shared/models/registry';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registry-form',
  templateUrl: './registry-form.component.html',
  styleUrls: ['./registry-form.component.css']
})
export class RegistryFormComponent implements OnInit {

  model: Registry;
  router: Router;

  onSubmit() {
    this.IndicatorService.addRegistry(this.model, 4); //Reemplazar por ID
    this.router.navigateByUrl('/indicator/1'); //Reemplazar por ID
  }

  showFormControls(form: any) {
    return form && form.controls['name'] &&
      form.controls['name'].value; // Dr. IQ
  }

  constructor(router: Router, private IndicatorService: IndicatorService) {
    this.model = new Registry();
    this.router = router;
  }

  ngOnInit() {
  }

}
