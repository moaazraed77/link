import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { user } from 'src/app/Modules/interfaces/user.interface';
import { DataService } from 'src/app/Modules/services/data.service';
// import Chart from 'chart.js/auto'

@Component({
  selector: 'app-home-links',
  templateUrl: './home-links.component.html',
  styleUrls: ['./home-links.component.scss']
})
export class HomeLinksComponent implements OnInit {

  Users: user[] = [];

  userDetails: user = {} as user;

  pageSize:number=50;
  
  currentPage:number=1;

  profile = this.formBuilder.group({
    email: [""],
    password: [""],
    Name: [""],
    bio: [""],
    userName: [""],
    X: [""],
    snapchat: [""],
    facebook: [""],
    instagram: [""],
    countryCode:[""],
    whatsapp: [""],
    tiktok: [""],
    photoUrl: [""],
    bgUrl: [""],
    location: [""],
    userId: [""],
    active: [true],
  })

  constructor(private dataServ: DataService, private formBuilder:FormBuilder, private toastr:ToastrService){}

  ngOnInit(): void {
    this.dataServ.getUserData().subscribe(data => {
      for (const key in data) {
        this.Users.push(data[key])
      }
    })
  }

  show(item:user){
    this.userDetails=item;
  }

  stop(item:user){
    if(item){
      this.profile.patchValue({
        Name: this.userDetails.Name,
        bio: this.userDetails.bio,
        email: this.userDetails.email,
        userName: this.userDetails.userName,
        X: this.userDetails.X,
        snapchat: this.userDetails.snapchat,
        facebook: this.userDetails.facebook,
        instagram: this.userDetails.instagram,
        countryCode: this.userDetails.countryCode,
        whatsapp: this.userDetails.whatsapp,
        tiktok: this.userDetails.tiktok,
        photoUrl: this.userDetails.photoUrl,
        bgUrl: this.userDetails.bgUrl,
        location: this.userDetails.location,
        userId: this.userDetails.userId,
        active:false
      })

      this.dataServ.getUserData().subscribe(data => {
        for (const key in data) {
          if (data[key].userId == this.userDetails.userId) {
            this.dataServ.updateUser(this.profile.value, key)?.subscribe(() => {
              this.toastr.success("accout Disabled")
              setTimeout(()=> location.reload() , 1000)
            })
          }
        }
      })
    }
  }

  activate(item:user){
    if(item){
      this.profile.patchValue({
        Name: this.userDetails.Name,
        bio: this.userDetails.bio,
        email: this.userDetails.email,
        userName: this.userDetails.userName,
        X: this.userDetails.X,
        snapchat: this.userDetails.snapchat,
        facebook: this.userDetails.facebook,
        instagram: this.userDetails.instagram,
        countryCode: this.userDetails.countryCode,
        whatsapp: this.userDetails.whatsapp,
        tiktok: this.userDetails.tiktok,
        photoUrl: this.userDetails.photoUrl,
        bgUrl: this.userDetails.bgUrl,
        location: this.userDetails.location,
        userId: this.userDetails.userId,
        active:true
      })

      this.dataServ.getUserData().subscribe(data => {
        for (const key in data) {
          if (data[key].userId == this.userDetails.userId) {
            this.dataServ.updateUser(this.profile.value, key)?.subscribe(() => {
              this.toastr.success("accout activated")
              setTimeout(()=> location.reload() , 1000)
            })
          }
        }
      })
    }
  }

}



