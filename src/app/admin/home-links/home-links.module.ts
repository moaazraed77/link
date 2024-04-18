import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeLinksRoutingModule } from './home-links-routing.module';
import { HomeLinksComponent } from './home-links.component';


@NgModule({
  declarations: [
    HomeLinksComponent
  ],
  imports: [
    CommonModule,
    HomeLinksRoutingModule
  ]
})
export class HomeLinksModule { }
