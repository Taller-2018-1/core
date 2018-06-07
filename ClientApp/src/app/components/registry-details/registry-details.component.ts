import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

//Models
import { Registry } from '../../shared/models/registry';
import { Document } from '../../shared/models/document';

//Services
import { RegistryService } from '../../services/registry/registry.service';
import { FileService } from '../../services/file/file.service';

@Component({
  selector: 'app-registry-details',
  templateUrl: './registry-details.component.html',
  styleUrls: ['./registry-details.component.css']
})
export class RegistryDetailsComponent implements OnInit {

  public registry: Registry;
  modalRef: BsModalRef;

  public document: Document = null; // For EditDocument
  public discriminator: string;

  idRegistry = -1;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: RegistryService,
              private fileService: FileService,
              private modalService: BsModalService) {
    this.getRegistry(this.route.snapshot.params.id);
    this.idRegistry = this.route.snapshot.params.id;
  }

  ngOnInit() {
  }

  private getRegistry(registryId: number) {
    this.service.getRegistry(registryId).subscribe(
      data => { this.registry = data; },
      err => console.error(err)
    );
  }

  goToLink(link: string) {
    //window.location.pathname = link;
    var url = "http://" + link;
    window.location.href = url;
  }

  download(document: Document) {
    this.fileService.downloadFile(document);
  }
  
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  deleteDocument(registry: Registry, document: Document) {
    const result = confirm('Está seguro que desea elimianr el documento: ' + document.documentName);
    if (registry.documents.length === 1) {
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

      const index: number = registry.documents.indexOf(document);
      if (index !== -1) {
        registry.documents.splice(index, 1);
      }
    }
  }

  openModalEditDocument(template: TemplateRef<any>, selectedDocument: Document) {
    this.document = selectedDocument;
    this.modalRef = this.modalService.show(template);
    this.discriminator = this.registry.discriminator;
  }

}
