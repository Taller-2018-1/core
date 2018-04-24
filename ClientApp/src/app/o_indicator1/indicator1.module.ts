import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Indicator1RoutingModule } from './indicator1-routing.module';
import { Indicator1Service, Indicator1GroupService } from './services';
import { Detail1EComponent } from './components/detail1e/detail1e.component';
import { Detail1DComponent } from './components/detail1d/detail1d.component';
import { Detail1BComponent } from './components/detail1b/detail1b.component';
import { Detail1AComponent } from './components/detail1a/detail1a.component';

@NgModule({
  imports: [
    CommonModule,
    Indicator1RoutingModule
  ],
  declarations: [
    Detail1AComponent,
    Detail1BComponent,
    Detail1DComponent,
    Detail1EComponent
  ],
  providers: [
    Indicator1Service,
    Indicator1GroupService
  ],
  exports: [
    Detail1AComponent,
    Detail1BComponent,
    Detail1DComponent,
    Detail1EComponent
  ]
})
export class Indicator1Module { }
