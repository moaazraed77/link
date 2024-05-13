import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'links-project';

  header_footer_view:boolean=true;

  constructor(private route: Router) {
    route.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        if (events.url.endsWith("home")) {
          if (sessionStorage.getItem("reloadHome") != "homeReloaded") {
            location.reload()
            sessionStorage.setItem("reloadHome", "homeReloaded");
          } else
            sessionStorage.setItem("reloadHome", "");
        }
        if (events.url.endsWith("mylinks")|| (!events.url.includes(events.url.split("/").find(ele =>ele=="home"||ele=="login"||ele=="sign-up"||ele=="profile")!))) {
          this.header_footer_view=false;
        }else{
          this.header_footer_view=true;
        }
      }
    })
  }
}
