import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MylinksComponent } from './mylinks.component';
import { MylinksEditComponent } from './mylinks-edit/mylinks-edit.component';

const routes: Routes = [
  {path:"",component:MylinksComponent,children:[
    {path:"",component:MylinksEditComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MylinksRoutingModule { }
