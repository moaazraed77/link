import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'links-project';

  header_footer_view: boolean = true;

  constructor(private route: Router) {
    route.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        let arr:string[] = events.url.split("/")
        if (arr[arr.length-1] == "" ||arr[arr.length-1] == "home" || arr[arr.length-1] == "login" || arr[arr.length-1] == "sign-up") {
          this.header_footer_view = true;
        } else {
          this.header_footer_view = false;
        }

        if (events.url.endsWith("home") || events.url.endsWith("")) {
          if (sessionStorage.getItem("reloadHome") != "homeReloaded") {
            location.reload()
            sessionStorage.setItem("reloadHome", "homeReloaded");
          } else
            sessionStorage.removeItem("reloadHome");
        }
      }
    })
  }
}
