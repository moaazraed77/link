import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { analytics } from 'src/app/Modules/interfaces/analytics.interface';
import { user } from 'src/app/Modules/interfaces/user.interface';
import { DataService } from 'src/app/Modules/services/data.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss', '../../Modules/css-styles/user-forms-style.css']
})
export class LinksComponent {

  currentUser: user = {} as user;

  userAnalytics: analytics = {} as analytics;

  userAnalyticsKey: string = ""

  analytics = this.formBuilder.group({
    uid: [""],
    username: [""],
    profile: [0],
    facebook: [0],
    instagram: [0],
    whatsapp: [0],
    x: [0],
    snapchat: [0],
    tiktok: [0],
  })

  constructor(private dataServ: DataService, private activatedRoute: ActivatedRoute,
     private formBuilder: FormBuilder, private route:Router) {
    let userNameFromURL: string = "";
    activatedRoute.paramMap.subscribe(params => [
      userNameFromURL = params.get("userName")?.toString()!
    ])
    dataServ.getUserData().subscribe({
      next: (value) => {
        for (const key in value) {
          if (value[key].userName == userNameFromURL) {
            this.currentUser = value[key];
            break;
          }
        }
      },
      complete: () => {
        dataServ.getUserAnalytics().subscribe({
          next: (data) => {
            for (const key in data) {
              if (data[key].username == userNameFromURL) {
                this.userAnalytics = data[key];
                this.userAnalyticsKey = key;
                break;
              }
            }
          },
          complete: () => {
            this.analytics.patchValue({
              uid: this.userAnalytics.uid,
              username: this.userAnalytics.username,
              profile: this.userAnalytics.profile + 1,
              facebook: this.userAnalytics.facebook,
              tiktok: this.userAnalytics.tiktok,
              snapchat: this.userAnalytics.snapchat,
              instagram: this.userAnalytics.instagram,
              x: this.userAnalytics.x,
              whatsapp: this.userAnalytics.whatsapp,
            })
            dataServ.updateUserAnalytics(this.analytics.value, this.userAnalyticsKey)
          }
        })
      }
    })

  }

  update(platform: string) {
    if (platform == "whatsapp") {
      this.analytics.patchValue({
        whatsapp: this.userAnalytics.whatsapp + 1,
      })
    } else if (platform == "snapchat") {
      this.analytics.patchValue({
        snapchat: this.userAnalytics.snapchat + 1,
      })
    } else if (platform == "instagram") {
      this.analytics.patchValue({
        instagram: this.userAnalytics.instagram + 1,
      })
    } else if (platform == "tiktok") {
      this.analytics.patchValue({
        tiktok: this.userAnalytics.tiktok + 1,
      })
    } else if (platform == "facebook") {
      this.analytics.patchValue({
        facebook: this.userAnalytics.facebook + 1,
      })
    } else if (platform == "x") {
      this.analytics.patchValue({
        x: this.userAnalytics.x + 1,
      })
    }
    this.dataServ.updateUserAnalytics(this.analytics.value, this.userAnalyticsKey)
  }
}
