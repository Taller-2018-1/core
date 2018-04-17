import { Component, OnInit } from '@angular/core';
import { Create1aService } from '../../services/create1a/create1a.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-create1a',
  templateUrl: './create1a.component.html',
    styleUrls: ['./create1a.component.css'],
    providers: [Create1aService]
})
export class Create1aComponent implements OnInit {

    model: Registro1A;
    submitted: boolean;

    onSubmit() {
        this.submitted = true;
        this.create1aService.setRegistro1A(this.model);
    }

    showFormControls(form: any) {
        return form && form.controls['name'] &&
            form.controls['name'].value; // Dr. IQ
    }

    constructor(private create1aService: Create1aService) { 
        this.model = new Registro1A("");
        this.submitted = false;
  }

  ngOnInit() {
    this.doLoad();
  }

  doLoad() {
    
  }  
}

export class Registro1A {
  name: string;
  
  constructor(name: string) {
      this.name = name;
  }
    
}