import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationComponent } from './location.component';
import { CityComponent } from './city/city.component';
import { StateComponent } from './state/state.component';
import { CountryComponent } from './country/country.component';

const routes: Routes = [{
  path: '',
  component: LocationComponent,
  children: [
    {
      path: 'country',
      component: CountryComponent,
    },
    {
      path: 'state',
      component: StateComponent,
    },
    {
      path: 'city',
      component: CityComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule { }

export const routedComponents = [
  LocationComponent,
  CityComponent,
  StateComponent,
  CountryComponent,
];