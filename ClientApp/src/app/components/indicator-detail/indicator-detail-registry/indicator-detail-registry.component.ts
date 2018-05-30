import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Registry } from '../../../shared/models/registry';
import { Document } from '../../../shared/models/document';
import { RegistryType } from '../../../shared/models/registryType';
import { RegistryService } from '../../../services/registry/registry.service';

@Component({
  selector: 'app-indicator-detail-registry',
  templateUrl: './indicator-detail-registry.component.html',
  styleUrls: ['./indicator-detail-registry.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndicatorDetailRegistryComponent implements OnInit {

  customClass: string = "card-header";

  @Input()
  public registries: Registry[];

  constructor(private registryService: RegistryService) { }

  ngOnInit() {
  }

  private deleteDocument(registry: Registry, document: Document) {
    const result = confirm('Está seguro que desea elimianr el documento: ' + document.documentName);
    if (registry.documents.length === 1) {
      alert('Debe existir al menos un documento de respaldo para el registro');
      return;
    }
    if (result) {
      let removed: Document;
      this.registryService.deleteDocument(document).subscribe(
        data => {
          removed = data;
        },
        err => console.error(err)
      );

      const index = registry.documents.indexOf(document);
      if (index !== -1) {
        registry.documents.splice(index, 1);
      }
    }
  }

}
