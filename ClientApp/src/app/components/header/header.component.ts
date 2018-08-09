import { Component, OnInit, HostBinding, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../../services/auth/AuthService';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';

import {IndicatorGroup} from '../../shared/models/indicatorGroup';
import {IndicatorGroupService} from '../../services/indicator-group/indicator-group.service';
import { Observable } from 'rxjs/Observable';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @HostBinding('class') classes = 'clearfix'; // This adds a class to the host container
  modalRef: BsModalRef;
  config = {
    animated: true
  };
  email: string;
  password: string;
  public indicatorGroupsComplete$ : Observable<IndicatorGroup[]>;
  authorize() {
    this.auth.auth({
      email: this.email,
      password: this.password
    }).subscribe(item => {
      console.log('ok');
      this.modalRef.hide();
    }, error => {
      this.email = '';
      this.password = '';
    });
  }

  constructor(private service: IndicatorGroupService,
              private modalService: BsModalService,
              private auth: AuthService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.indicatorGroupsComplete$ = this.service.getIndicatorGroupsComplete();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  openModalReport(template: TemplateRef<any>)
  {
    this.modalRef = this.modalService.show(template,  {class: 'modal-lg modal-md'});
  }

  logOut() {
    this.auth.signOut().subscribe();
    this.router.navigateByUrl('/welcome') ;
  }
  get isLogged(): boolean {
    return this.auth.getUser() !== false;
  }

  goToConfigPage() {
    this.router.navigateByUrl('/config') ;
  }
}
