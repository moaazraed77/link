import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LinksComponent } from './components/links/links.component';
import { MylinksComponent } from './components/mylinks/mylinks.component';
import { profileGuard } from './Modules/gards/profile.guard';

const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"sign-up",component:SignUpComponent},
  // {path:"profile",component:ProfileComponent},
  {path:"mylinks",component:MylinksComponent,canActivate:[profileGuard]},
  {path:":userName",component:LinksComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration:"enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
