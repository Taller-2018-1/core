import { Component, OnInit, Input } from '@angular/core';

import { Registry } from '../../../shared/models/registry';
import { Indicator } from '../../../shared/models/indicator';
import { RegistryService } from '../../../services/registry/registry.service';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-registry-editor',
  templateUrl: './registry-editor.component.html',
  styleUrls: ['./registry-editor.component.css'],
})
export class RegistryEditorComponent implements OnInit {

  @Input()
  public registry: {registry: Registry, type: number};

  @Input()
  public editModalRef: BsModalRef;

  constructor(private service: RegistryService) {
    
  }

  ngOnInit() { }

  editRegistry() {
    this.service.editRegistry(this.registry.registry, this.registry.type).subscribe();
    this.editModalRef.hide();
    //this.registry = null;
    this.editModalRef = null;
  }
}
