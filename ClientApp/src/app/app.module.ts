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
import { RegistryFormComponent } from './components/registry-form/registry-form.component';
import { RegistryDetailsComponent } from './components/registry-details/registry-details.component';
import { FileDocumentFormComponent } from './components/file-document-form/file-document-form.component';
import { LinkDocumentFormComponent } from './components/link-document-form/link-document-form.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultHomeComponent } from './components/result-home/result-home.component';
import { ResultDisplayComponent } from './components/result-home/result-display/result-display.component';

import { IndicatorService } from './services/indicator/indicator.service';
import { IndicatorGroupService } from './services/indicator-group/indicator-group.service';
import { RegistryService } from './services/registry/registry.service';


@NgModule({
  declarations: [
    AppComponent,
    IndicatorDetailComponent,
    HeaderComponent,
    FooterComponent,
    IndicatorHomeComponent,
    IndicatorDetailComponent,
    IndicatorDisplayComponent,
    ResultDisplayComponent,
    ResultHomeComponent,
    RegistryFormComponent,
    RegistryDetailsComponent,
    FileDocumentFormComponent,
    LinkDocumentFormComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ModalModule.forRoot(),
    FormsModule,

    RouterModule.forRoot([
      { path: 'indicator/:idIndicator', component: IndicatorDetailComponent },
      { path: 'indicator-add-registry', component: RegistryFormComponent },
      { path: 'registry/:id', component: RegistryDetailsComponent },
      { path: 'indicatorGroup/:idIndicatorGroup',   component: IndicatorHomeComponent },
      { path: 'registry-add-file-document', component: FileDocumentFormComponent },
      { path: 'registry-add-link-document', component: LinkDocumentFormComponent },
      { path: 'home',        component: ResultHomeComponent },
      { path: '',            component: ResultHomeComponent },
      { path: '**',          component: ResultHomeComponent }
    ])
  ],
  providers: [IndicatorService, IndicatorGroupService, RegistryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
