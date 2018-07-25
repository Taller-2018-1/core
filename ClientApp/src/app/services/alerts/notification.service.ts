import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Injectable()
export class NotificationService {

  private toaster: any;
  constructor() {
    this.toaster = swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000
    });
  }

  public showToaster(text: String, type: 'success'|'warning'|'error'|'success'|'info'|'question') {
    this.toaster({
      type: type,
      title: text
    });
  }
}
