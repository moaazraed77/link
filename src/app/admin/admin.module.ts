import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { HomeLinksComponent } from './home-links/home-links.component';
import { HomeLinksModule } from './home-links/home-links.module';
import { AsdComponent } from './asd/asd.component';


@NgModule({
  declarations: [
    AsdComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HomeLinksModule
  ],
  exports:[
    AsdComponent
  ]
})
export class AdminModule { }
