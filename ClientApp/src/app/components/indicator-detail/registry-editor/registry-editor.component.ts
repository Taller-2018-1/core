import { Component, OnInit, Input } from '@angular/core';

import { Registry } from '../../../shared/models/registry';
import { Indicator } from '../../../shared/models/indicator';
import { RegistryService } from '../../../services/registry/registry.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

import { Document } from '../../../shared/models/document';
import { equal, deepEqual, notDeepEqual } from 'assert';

@Component({
  selector: 'app-registry-editor',
  templateUrl: './registry-editor.component.html',
  styleUrls: ['./registry-editor.component.css'],
})
export class RegistryEditorComponent implements OnInit {

  @Input()
  public registries: Registry[]; // To automatically update the registries; this.registry = this.newRegistry didn't work

  @Input()
  public registry: Registry;
  public newRegistry: Registry;

  @Input()
  public registriesType: number;

  @Input()
  public editModalRef: BsModalRef;

  public bsValue;

  constructor(private service: RegistryService) {  }

  ngOnInit() {
    this.newRegistry = JSON.parse(JSON.stringify(this.registry)); // To create a clone of the selected registry (this.registry)
  }

  editRegistry() {
    try {
      notDeepEqual(this.registry, this.newRegistry); // If registry and newRegistry are not equal, just close the modal
      this.service.editRegistry(this.newRegistry, this.registriesType).subscribe();

      // replacing the old registry (this.registry) with the edited registry (this.newRegistry)
      let index = this.registries.indexOf(this.registry);
      this.registries[index] = this.newRegistry;

    }
    catch (error) {

    }
    this.editModalRef.hide();
    // this.registry = null;
    this.editModalRef = null;
  }

  deleteDocument(document: Document) {
    const result = confirm('Está seguro que desea eliminar el documento: ' + document.documentName);
    if (this.registry.documents.length === 1) {
      alert('Debe existir al menos un documento de respaldo para el registro');
      return;
    }
    if (result) {
      let removed: Document;
      this.service.deleteDocument(document).subscribe(
        data => {
          removed = data;
        },
        err => console.error(err)
      );

      const index: number = this.registry.documents.indexOf(document);
      if (index !== -1) {
        this.registry.documents.splice(index, 1);
      }
    }
  }

}
