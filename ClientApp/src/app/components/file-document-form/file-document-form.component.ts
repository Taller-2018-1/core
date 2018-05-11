import { Component, OnInit } from '@angular/core';
import { Registry } from '../../shared/models/registry';
import { RegistryService } from '../../services/registry/registry.service';
import { Document } from '../../shared/models/document';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http'
import { Router } from '@angular/router';

@Component({
  selector: 'app-file-document-form',
  templateUrl: './file-document-form.component.html',
  styleUrls: ['./file-document-form.component.css']
})
export class FileDocumentFormComponent implements OnInit {

  model: Document;
  public progress: number;
  public message: string;

  onSubmit() {
    console.log(this.model);
    this.model.extension = "file";
    this.RegistryService.addFileDocument(this.model, 1); //Reemplazar por ID
    this.router.navigateByUrl('/indicator-detail');
  }

  upload(files) {
    if (files.length === 0)
      return;

    const formData = new FormData();

    for (let file of files)
      formData.append(file.name, file);

    const uploadReq = new HttpRequest('POST', `api/Registries/1/AddFileDocument`, formData, {
      reportProgress: true,
    });

    this.http.request(uploadReq).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * event.loaded / event.total);
      else if (event.type === HttpEventType.Response)
        this.message = event.body.toString();
    });
  }

  showFormControls(form: any) {
    return form && form.controls['name'] &&
      form.controls['name'].value; // Dr. IQ
  }

  constructor(private http: HttpClient, private router: Router, private RegistryService: RegistryService) {
    this.model = new Document();
    this.model.name = "Nombre";
  }

  ngOnInit() {
  }

}
