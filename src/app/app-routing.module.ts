import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { LinksComponent } from './components/links/links.component';
import { MylinksComponent } from './components/mylinks/mylinks.component';
import { profileGuard } from './Modules/gards/profile.guard';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { dashLoginGuard } from './Modules/services/dash-login.guard';
import { LoginDashComponent } from './components/login-dash/login-dash.component';

const routes: Routes = [
  {path:"", redirectTo:"home", pathMatch:"full"},
  {path:"home",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"sign-up",component:SignUpComponent},
  {path:"forget-pass",component:ForgetPasswordComponent},
  {path:"mylinks",loadChildren:()=> import("./components/mylinks/mylinks.module").then(m=> m.MylinksModule)},
  {path:"adm",loadChildren: ()=> import("./admin/admin.module").then(m => m.AdminModule),canActivate:[dashLoginGuard]},
  {path:"dash-login",component:LoginDashComponent},
  {path:":userName",component:LinksComponent}, // for accout username
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true,scrollPositionRestoration:"enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
