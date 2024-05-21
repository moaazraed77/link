import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeLinksRoutingModule } from './home-links-routing.module';
import { HomeLinksComponent } from './home-links.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    HomeLinksComponent
  ],
  imports: [
    CommonModule,
    HomeLinksRoutingModule,
    NgxPaginationModule
  ]
})
export class HomeLinksModule { }
