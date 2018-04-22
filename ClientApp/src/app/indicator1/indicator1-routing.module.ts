import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Detail1AComponent, Detail1BComponent, Detail1DComponent, Detail1EComponent } from '.';

const routes: Routes = [
  { path: 'detail1a', component: Detail1AComponent },
  { path: 'detail1b', component: Detail1BComponent },
  { path: 'detail1d', component: Detail1DComponent },
  { path: 'detail1e', component: Detail1EComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Indicator1RoutingModule { }
