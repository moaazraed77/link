import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';
import { CarasouelDirective } from './Modules/directives/carasouel.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    CarasouelDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule , // is shared module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
