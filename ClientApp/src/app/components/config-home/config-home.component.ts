import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs/Observable';


// Models
import { Indicator } from '../../shared/models/indicator';
import { IndicatorGroup } from '../../shared/models/indicatorGroup';

// services
import { IndicatorService } from '../../services/indicator/indicator.service';
import { IndicatorGroupService } from '../../services/indicator-group/indicator-group.service';
import { NotificationService } from '../../services/alerts/notification.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-config-home',
  templateUrl: './config-home.component.html',
  styleUrls: ['./config-home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigHomeComponent implements OnInit {

  indicatorsGroups$: Observable<IndicatorGroup[]>;

  constructor(private indicatorService: IndicatorService,
              private indicatorGroupService: IndicatorGroupService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.indicators$ = this.indicatorService.getIndicators();
    this.indicatorsGroups$ = this.indicatorGroupService.getIndicatorGroups();
  }

  deleteIndicator($event: any, indicator: Indicator) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    this.confirmDeleteIndicator(indicator.name).then( result => {
      if (result.value) {
        this.indicatorService.deleteIndicator(indicator).subscribe(data =>{
          this.notificationService.showToaster('Indicador eliminado', 'success');
          this.indicatorsGroups$ = this.indicatorGroupService.getIndicatorGroups();
        });
      } else {
        // Do nothing
      }
    }, error =>{
      this.notificationService.showToaster('Error al eliminar el registro', 'error');
    });
  }

  deleteIndicatorGroup($event: any, indicatorGroup: IndicatorGroup) {
    if ($event) {
      $event.stopPropagation();
      $event.preventDefault();
    }

    this.confirmDeleteIndicatorGroup(indicatorGroup.name).then( result => {
      if (result.value) {
        this.indicatorGroupService.deleteIndicatorGroup(indicatorGroup).subscribe( data => {
          this.notificationService.showToaster('Resultado esperado eliminado', 'success');
          this.indicatorsGroups$ = this.indicatorGroupService.getIndicatorGroups();
        });
      } else {
        // Do nothing
      }
    },error =>{
        this.notificationService.showToaster('Error al eliminar el resultado esperado', 'error');
    });
  }

  private confirmDeleteIndicator(name: string) {
    return swal({
      title: 'Eliminar indicador',
      html: '<h6>¿Está seguro que desea eliminar el indicador <br>"' + name + '"?</h6><br>Esta acción no puede ser revertida y se perderán todos los datos relacionados' +
      '<hr style="margin-top: 15px !important; margin-bottom: 2.5px !important;">',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'CANCELAR',
      buttonsStyling: false,
      reverseButtons: true,
      confirmButtonClass: 'btn btn-sm btn-primary',
      cancelButtonClass: 'btn btn-sm btn-clean-2 btn-cancel',
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

  private confirmDeleteIndicatorGroup(name: string) {
    return swal({
      title: 'Eliminar resultado esperado',
      html: '<h6>¿Está seguro que desea eliminar el resultado<br>"' + name + '"?</h6><br>Esta acción no puede ser revertida y se perderán todos los datos relacionados' +
      '<hr style="margin-top: 15px !important; margin-bottom: 2.5px !important;">',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'CANCELAR',
      buttonsStyling: false,
      reverseButtons: true,
      confirmButtonClass: 'btn btn-sm btn-primary',
      cancelButtonClass: 'btn btn-sm btn-clean-2 btn-cancel',
      allowOutsideClick: false,
      allowEscapeKey: false
    });
  }

}
