import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MylinksRoutingModule } from './mylinks-routing.module';
import { MylinksComponent } from './mylinks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';
import { AdminModule } from 'src/app/admin/admin.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    MylinksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule
    // AppModule
  ]
})
export class MylinksModule { }
