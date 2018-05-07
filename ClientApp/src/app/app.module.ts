import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IndicatorHomeComponent } from './components/indicator-home/indicator-home.component';
import { IndicatorDisplayComponent } from './components/indicator-home/indicator-display/indicator-display.component';
import { IndicatorDetailComponent } from './components/indicator-detail/indicator-detail.component';

import { IndicatorService } from './services/indicator/indicator.service';
import { IndicatorGroupService } from './services/indicator-group/indicator-group.service';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistryEditorComponent } from './components/indicator-detail/registry-editor/registry-editor.component';
import { RegistryService } from './services/registry/registry.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndicatorHomeComponent,
    IndicatorDetailComponent,
    IndicatorDisplayComponent,
    RegistryEditorComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: 'indicator/:idIndicator', component: IndicatorDetailComponent },
      { path: 'home',        component: IndicatorHomeComponent },
      { path: '',            component: IndicatorHomeComponent },
      { path: '**',          component: IndicatorHomeComponent }
    ])
  ],
  providers: [IndicatorService, IndicatorGroupService, RegistryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
