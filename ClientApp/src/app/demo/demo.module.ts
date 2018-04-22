import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { FormsModule } from '@angular/forms';
import { DemoRoutingModule } from './demo-routing.module';


@NgModule({
  imports: [
    CommonModule,
    DemoRoutingModule,
    FormsModule
  ],
  declarations: [
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  exports: [
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ]
})
export class DemoModule {

}
