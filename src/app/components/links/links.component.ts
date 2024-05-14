import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { user } from 'src/app/Modules/interfaces/user.interface';
import { DataService } from 'src/app/Modules/services/data.service';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss', '../../Modules/css-styles/user-forms-style.css']
})
export class LinksComponent {
  
  currentUser: user = {} as user;
  
  constructor(private dataServ:DataService,private activatedRoute:ActivatedRoute){
    let userNameFromURL:string ="";
    activatedRoute.paramMap.subscribe(params =>[
      userNameFromURL=params.get("userName")?.toString()!
    ])
    dataServ.getUserData().subscribe({
      next: (value) => {
        for (const key in value) {
          this.currentUser = (value[key].userName == userNameFromURL) ? value[key] : this.currentUser;
        }
        console.log(this.currentUser)
      },
    })
  }

}
