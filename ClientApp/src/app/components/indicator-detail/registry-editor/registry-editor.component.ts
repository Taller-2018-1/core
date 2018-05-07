import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap'; // Gonna need this

import { Registry } from '../../../shared/models/registry';
import { Indicator } from '../../../shared/models/indicator';
import { RegistryService } from '../../../services/registry/registry.service';


@Component({
  selector: 'app-registry-editor',
  templateUrl: './registry-editor.component.html',
  styleUrls: ['./registry-editor.component.css'],
})
export class RegistryEditorComponent implements OnInit {

  @Input()
  public registry: {registry: Registry, type: number};

  private registryType: number;

  constructor(private modalService: NgbModal, private service: RegistryService) {
    
  }

  ngOnInit() { }

  editRegistry() {
    console.log(this.registry.registry);
    console.log(this.registry.registry.quantity);
    this.service.editRegistry(this.registry.registry).subscribe();
    this.registry = null;
  }
}
