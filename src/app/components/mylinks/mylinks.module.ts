import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MylinksRoutingModule } from './mylinks-routing.module';
import { MylinksEditComponent } from './mylinks-edit/mylinks-edit.component';
import { MylinksComponent } from './mylinks.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppModule } from 'src/app/app.module';


@NgModule({
  declarations: [
    MylinksEditComponent
  ],
  imports: [
    CommonModule,
    MylinksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // AppModule
  ]
})
export class MylinksModule { }
