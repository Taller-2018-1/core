import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Detail1bComponent, Detail1dComponent, Detail1eComponent, Detail1aComponent } from '.';

const routes: Routes = [
  { path: 'detail1b', component: Detail1bComponent },
  { path: 'detail1d', component: Detail1dComponent },
  { path: 'detail1e', component: Detail1eComponent },
  { path: 'detail1a', component: Detail1aComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Indicator1RoutingModule { }
