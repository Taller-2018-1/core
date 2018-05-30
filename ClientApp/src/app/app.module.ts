import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { IndicatorHomeComponent } from './components/indicator-home/indicator-home.component';
import { IndicatorDisplayComponent } from './components/indicator-home/indicator-display/indicator-display.component';
import { IndicatorDetailComponent } from './components/indicator-detail/indicator-detail.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ResultHomeComponent } from './components/result-home/result-home.component';
import { ResultDisplayComponent } from './components/result-home/result-display/result-display.component';

import { IndicatorService } from './services/indicator/indicator.service';
import { IndicatorGroupService } from './services/indicator-group/indicator-group.service';
import { RegistryFormComponent } from './components/registry-form/registry-form.component';
import { RegistryDetailsComponent } from './components/registry-details/registry-details.component';
import { FileDocumentFormComponent } from './components/file-document-form/file-document-form.component';
import { LinkDocumentFormComponent } from './components/link-document-form/link-document-form.component';

import { RegistryEditorComponent } from './components/indicator-detail/registry-editor/registry-editor.component';
import { RegistryService } from './services/registry/registry.service';
import { AuthService } from './services/auth/AuthService';
import { CanActivateUser } from './services/auth/CanActivateService';
import { WelcomeComponent } from './components/welcome-component/welcome-component.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndicatorHomeComponent,
    IndicatorDetailComponent,
    IndicatorDisplayComponent,
    RegistryFormComponent,
    FileDocumentFormComponent,
    LinkDocumentFormComponent,
    RegistryDetailsComponent,
    RegistryEditorComponent,
    ResultDisplayComponent,
    ResultHomeComponent,
    WelcomeComponent
  ],
  imports: [
    BsDropdownModule.forRoot(),
    NgbModule.forRoot(),
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ModalModule.forRoot(),

    RouterModule.forRoot([
      { path: 'indicator/:idIndicator', component: IndicatorDetailComponent },
      { path: 'registry-details/:id', component: RegistryDetailsComponent },
      { path: 'indicatorGroup/:idIndicatorGroup',   component: IndicatorHomeComponent },
      { path: 'registry-details/:id', component: RegistryDetailsComponent },
      { path: 'home',        component: ResultHomeComponent },
      { path: '',            component: WelcomeComponent },
      { path: '**',          component: ResultHomeComponent },
    ])
  ],
  providers: [IndicatorService, IndicatorGroupService, RegistryService, AuthService, CanActivateUser],
  bootstrap: [AppComponent]
})
export class AppModule { }
