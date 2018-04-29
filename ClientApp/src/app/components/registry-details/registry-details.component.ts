import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Inject } from '@angular/core';
import { Registry } from '../../shared/models/registry';
import { RegistryService } from '../../services/registry/registry.service';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registry-details',
  templateUrl: './registry-details.component.html',
  styleUrls: ['./registry-details.component.css']
})
export class RegistryDetailsComponent implements OnInit {

  public registry: Registry;

  constructor(private router: Router, private route: ActivatedRoute, private service: RegistryService) {
    this.getRegistry(this.route.snapshot.params.id);
  }

  ngOnInit() {
  }

  private getRegistry(registryId: number) {
    this.service.getRegistry(registryId).subscribe(
      data => { this.registry = data; },
      err => console.error(err)
    );
  }

}
