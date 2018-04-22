import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { HomeComponent, CounterComponent, FetchDataComponent, DemoModule } from './demo';
import { Indicator1Service } from './indicator1/services';
import { SharedModule } from './shared/shared.module';
import { Indicator1Module } from './indicator1/indicator1.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,

    DemoModule,
    Indicator1Module,
    SharedModule,

    RouterModule.forRoot([
      {path: 'indicators', loadChildren: './indicator1/indicator1-routing.module#Indicator1RoutingModule'},
      {path: 'demo', loadChildren: './demo/demo-routing.module#DemoRoutingModule'}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
