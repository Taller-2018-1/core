import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { Detail1dComponent } from './components/detail1d/detail1d.component';
import { Detail1dService } from './services/detail1d/detail1d.service';
import { Detail1eComponent } from './components/detail1e/detail1e.component';
import { Detail1eService } from './services/detail1e/detail1e.service';
import { Detail1aComponent } from './components/detail1a/detail1a.component';
import { Create1aComponent } from './components/create1a/create1a.component';
import { Create1aService } from './services/create1a/create1a.service';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        Detail1dComponent,
        Detail1eComponent,
        Detail1aComponent,
        Create1aComponent      
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'detail1d', component: Detail1dComponent },
            { path: 'detail1e', component: Detail1eComponent },
            { path: 'detail1a', component: Detail1aComponent },
            { path: 'create1a', component: Create1aComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [Detail1eService, Detail1dService, Create1aService]
})
export class AppModuleShared {
}
