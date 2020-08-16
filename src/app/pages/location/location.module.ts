import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LocationService } from '../../_services/location.service'
import { LocationRoutingModule, routedComponents } from './location-routing.module';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { CityComponent } from './city/city.component';


@NgModule({
  declarations: [...routedComponents,CountryComponent, StateComponent, CityComponent],
  imports: [
    CommonModule,
    LocationRoutingModule,
    ThemeModule,
    Ng2SmartTableModule
  ],
  providers: [LocationService],
})
export class LocationModule { }
