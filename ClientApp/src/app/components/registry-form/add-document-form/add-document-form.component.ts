import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-document-form',
  templateUrl: './add-document-form.component.html',
  styleUrls: ['./add-document-form.component.css']
})
export class AddDocumentFormComponent implements OnInit {

  linkChecked: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
