import { Component, OnInit, Input } from '@angular/core';
import { Registry } from '../../../shared/models/registry';
import { RegistryType } from '../../../shared/models/registryType';

@Component({
  selector: 'app-indicator-detail-registry',
  templateUrl: './indicator-detail-registry.component.html',
  styleUrls: ['./indicator-detail-registry.component.scss']
})
export class IndicatorDetailRegistryComponent implements OnInit {

  @Input()
  public registries: Registry[];

  constructor() { }

  ngOnInit() {
  }

}
