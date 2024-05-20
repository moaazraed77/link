import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MylinksComponent } from './mylinks.component';

const routes: Routes = [
  {path:"",component:MylinksComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MylinksRoutingModule { }
