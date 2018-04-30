import { Component, OnInit } from '@angular/core';
import { Registry } from '../../shared/models/registry';
import { RegistryService } from '../../services/registry/registry.service';
import { Document } from '../../shared/models/document';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link-document-form',
  templateUrl: './link-document-form.component.html',
  styleUrls: ['./link-document-form.component.css']
})
export class LinkDocumentFormComponent implements OnInit {

  model: Document;

  onSubmit() {
    console.log(this.model);
    this.model.extension = "link";
    this.RegistryService.addLinkDocument(this.model, 1); //Reemplazar por ID
    this.router.navigateByUrl('/indicator-detail');
  }

  showFormControls(form: any) {
    return form && form.controls['name'] &&
      form.controls['name'].value; // Dr. IQ
  }

  constructor(private router: Router, private RegistryService: RegistryService) {
    this.model = new Document();
    this.model.name = "Nombre";
    this.model.link = "";
  }

  ngOnInit() {
  }

}
