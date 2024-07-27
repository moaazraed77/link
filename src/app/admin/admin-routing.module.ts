import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLinksComponent } from './home-links/home-links.component';
import { AdminComponent } from './admin.component';
import { PartinaersComponent } from './partinaers/partinaers.component';

const routes: Routes = [
  {path:"", component:AdminComponent,children:[
    {path:"home-links",loadChildren:()=> import("./home-links/home-links.module").then(m=>m.HomeLinksModule)},
    {path:"partiner",component:PartinaersComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
