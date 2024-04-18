import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLinksComponent } from './home-links.component';

const routes: Routes = [
  {path:"",component:HomeLinksComponent},

  // is a path-child after the module link   http://localhost:4200/admin/home-links/me
  {path:"me",component:HomeLinksComponent}, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeLinksRoutingModule { }
