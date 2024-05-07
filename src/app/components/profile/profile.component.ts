import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { user } from 'src/app/Modules/interfaces/user.interface';
import { DataService } from 'src/app/Modules/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss', '../../Modules/css-styles/user-forms-style.css']
})
export class ProfileComponent {
  url = "url(/assets/2.png)";
  currentUser: user = {} as user;
  load: boolean = false;

  showBtn:string=""

  profile = this.formBuilder.group({
    email: [""],
    password: [""],
    userName: [""],
    X: [""],
    snapchat: [""],
    facebook: [""],
    instagram: [""],
    whatsapp: [""],
    tiktok: [""],
    photoUrl: [""],
    location: [""],
    userId: [""],
  })

  constructor(private dataServ: DataService, private formBuilder: FormBuilder, private toastr:ToastrService) {
    let USR = JSON.parse(localStorage.getItem("loginObject")!); // get user data 
    dataServ.getUserData().subscribe({
      next: (value) => {
        for (const key in value) {
          this.currentUser = (value[key].userId == USR.uid) ? value[key] : this.currentUser;
        }
      },
      complete: () => {
        this.load = false;
        this.currentUser
        this.profile.patchValue({
          email: this.currentUser.email,
          userName: this.currentUser.userName,
          X: this.currentUser.X,
          snapchat: this.currentUser.snapchat,
          facebook: this.currentUser.facebook,
          instagram: this.currentUser.instagram,
          whatsapp: this.currentUser.whatsapp,
          tiktok: this.currentUser.tiktok,
          photoUrl: this.currentUser.photoUrl,
          location: this.currentUser.location,
          userId: this.currentUser.userId,
        })
      }
    })
  }

  submit(){
    this.dataServ.getUserData().subscribe(data =>{
      for (const key in data) {
        if(data[key].userId == this.currentUser.userId){
          this.dataServ.updateUser(this.profile.value,key)?.subscribe(()=>{
            this.toastr.warning("تم تعديل الرواط الخاصة بك")
          })
        }
      }
    })
  }


  show(id:string){
    this.showBtn=id;
  }







}
