import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Observable } from '../../../../node_modules/rxjs/Observable';


// Models
import { Indicator } from '../../shared/models/indicator';
import { IndicatorGroup } from '../../shared/models/indicatorGroup';

// services
import { IndicatorService } from '../../services/indicator/indicator.service';
import { IndicatorGroupService } from '../../services/indicator-group/indicator-group.service';

import swal from 'sweetalert2';

@Component({
  selector: 'app-config-home',
  templateUrl: './config-home.component.html',
  styleUrls: ['./config-home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ConfigHomeComponent implements OnInit {

  indicators$: Observable<Indicator[]>;
  indicatorsGroups$: Observable<IndicatorGroup[]>;

  constructor(private indicatorService: IndicatorService,
  private indicatorGroupService: IndicatorGroupService) { }

  ngOnInit() {
    this.indicators$ = this.indicatorService.getIndicators();
    this.indicatorsGroups$ = this.indicatorGroupService.getIndicatorGroups();
  }

  deleteIndicator(indicator: Indicator) {
    this.confirmDeleteIndicator(indicator.name).then( result => {
      if (result.value) {
        console.log(true);
      } else {
        console.log(false);
      }
    });


  }

  private confirmDeleteIndicator(name: string) {
    return swal({
      title: 'Eliminar indicador',
      html: '<h6>¿Está seguro que desea eliminar el indicador <br>"' + name + '"?</h6><br>Esta acción no puede ser revertida y se perderán todos los registros relacionados' +
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
