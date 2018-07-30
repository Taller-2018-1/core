import { Component, OnInit, HostBinding, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from '../../services/auth/AuthService';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';

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

  authorize() {
    this.auth.auth({
      email: this.email,
      password: this.password
    }).subscribe(item => {
      console.log('ok');
      this.modalRef.hide()
    }, error => {
      this.email = "";
      this.password = "";
    });
  }

  constructor(private modalService: BsModalService, private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  logOut() {
    this.auth.signOut().subscribe();
  }
  get isLogged(): boolean {
    return this.auth.getUser() !== false;
  }

  goToConfigPage() {
    this.router.navigateByUrl('/config') ;
  }
}
