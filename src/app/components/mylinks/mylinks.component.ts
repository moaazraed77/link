import { Component, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { user } from 'src/app/Modules/interfaces/user.interface';
import { DataService } from 'src/app/Modules/services/data.service';
import { PhoneCountriesAPIService } from 'src/app/Modules/services/phone-countries-api.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';  // write this special code for upload img 
import { Router } from '@angular/router';
import { analytics } from 'src/app/Modules/interfaces/analytics.interface';

@Component({
  selector: 'app-mylinks',
  templateUrl: './mylinks.component.html',
  styleUrls: ['./mylinks.component.scss', '../../Modules/css-styles/user-forms-style.css']
})
export class MylinksComponent {

  currentUser: user = {} as user;
  load: boolean = false;
  showBtn: string = "";
  links: string[] = []
  countries: any[] = [];
  arr: any[] = [];
  partView: string = "home";
  uploading: string = ""
  photoUrl: string = ""
  bgUrl: string = ""
  imgFile: any = null;
  imgBackgroundFile: any = null;
  countryCode: string = "";
  copyLinkText: string = "copy link";
  userAnalytics: analytics = {} as analytics;
  linkSubmitClick:boolean=false;
  getCodesClick:boolean=false;

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
    countryCallCode:[""],
    phone: [""],
    LinkedIn: [""],
    tiktok: [""],
    photoUrl: [""],
    bgUrl: [""],
    location: [""],
    userId: [""],
    active: [true],
  })

  constructor(private dataServ: DataService, private PhoneCountriesAPI: PhoneCountriesAPIService,
    private formBuilder: FormBuilder, private toastr: ToastrService,
    private firestorage: AngularFireStorage, private route: Router) {
    // get countries code
    this.countries=PhoneCountriesAPI.arabCountryCodes;
    // get User data
    let USR = JSON.parse(sessionStorage.getItem("loginObject")!); // get local user data 
    // fitch about user
    dataServ.getUserData().subscribe({
      next: (value) => {
        for (const key in value) {
          if (value[key].userId == USR.uid) {
            this.currentUser = value[key];
            break;
          };
        }
        if (!this.currentUser.photoUrl)
          this.currentUser.photoUrl = "assets/man.png"
      },
      complete: () => {
        this.load = false;
        dataServ.getUserAnalytics().subscribe({
          next: (data) => {
            for (const key in data) {
              if (data[key].username == this.currentUser.userName) {
                this.userAnalytics = data[key];
                break;
              }
            }
          },
        })
        this.profile.patchValue({
          Name: this.currentUser.Name,
          bio: this.currentUser.bio,
          email: this.currentUser.email,
          userName: this.currentUser.userName,
          X: this.currentUser.X,
          snapchat: this.currentUser.snapchat,
          facebook: this.currentUser.facebook,
          instagram: this.currentUser.instagram,
          countryCode: this.currentUser.countryCode,
          whatsapp: this.currentUser.whatsapp,
          countryCallCode: this.currentUser.countryCallCode,
          phone: this.currentUser.phone,
          LinkedIn: this.currentUser.LinkedIn,
          tiktok: this.currentUser.tiktok,
          photoUrl: this.currentUser.photoUrl,
          bgUrl: this.currentUser.bgUrl,
          location: this.currentUser.location,
          userId: this.currentUser.userId,
          active: this.currentUser.active,
        })
      }
    })
  }

  submit() {
    this.linkSubmitClick=true;
    this.dataServ.getUserData().subscribe(data => {
      for (const key in data) {
        if (data[key].userId == this.currentUser.userId) {
          this.dataServ.updateUser(this.profile.value, key)?.subscribe(() => {
            location.reload()
          })
        }
      }
    })
  }

  deleteLink(item: string) {
    if (item == "whatsapp") {
      this.profile.patchValue({
        whatsapp: ""
      })
      this.currentUser.whatsapp = ""
    } else if (item == "snapchat") {
      this.profile.patchValue({
        snapchat: ""
      })
      this.currentUser.snapchat = ""
    } else if (item == "instagram") {
      this.profile.patchValue({
        instagram: ""
      })
      this.currentUser.instagram = ""
    } else if (item == "tiktok") {
      this.profile.patchValue({
        tiktok: ""
      })
      this.currentUser.tiktok = ""
    } else if (item == "facebook") {
      this.profile.patchValue({
        facebook: ""
      })
      this.currentUser.facebook = ""
    } else if (item == "x") {
      this.profile.patchValue({
        X: ""
      })
      this.currentUser.X = ""
    } else if (item == "LinkedIn") {
      this.profile.patchValue({
        LinkedIn: ""
      })
      this.currentUser.LinkedIn = ""
    }
    else if (item == "phone") {
      this.profile.patchValue({
        phone: ""
      })
      this.currentUser.phone = ""
    }
    this.submit();
  }


  // for promo upload image 
  uploadPromo(event: any) {
    let loader = new FileReader();
    this.imgFile = event.target.files[0]
    loader.readAsDataURL(event.target.files[0])
    loader.onload = (event) => {
      this.photoUrl = event.target?.result?.toString()!;
    }
  }

  // for promo upload background image 
  uploadBackgroundPromo(event: any) {
    let loader = new FileReader();
    this.imgBackgroundFile = event.target.files[0]
    loader.readAsDataURL(event.target.files[0])
    loader.onload = (event) => {
      this.bgUrl = event.target?.result?.toString()!;
    }
  }

  // upload on server
  async uploadPhoto() {
    this.uploading = "uploadingImage";
    if (this.imgFile) {
      const path = `link/${new Date().getTime()}${this.imgFile.name}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path, this.imgFile)
      const url = await uploadTask.ref.getDownloadURL()
      this.profile.patchValue({
        photoUrl: url
      })
    }
    if (this.imgBackgroundFile) {
      const path = `link/${new Date().getTime()}${this.imgBackgroundFile.name}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path, this.imgBackgroundFile)
      const bgUrl = await uploadTask.ref.getDownloadURL()
      this.profile.patchValue({
        bgUrl: bgUrl
      })
    }
    this.uploading = "uploadedImage";
    this.submit()
  }

  copyLink() {
    this.copyLinkText = "copied";
    setTimeout(() => this.copyLinkText = "copy link", 2000);
    navigator.clipboard.writeText(document.getElementById("link")?.getAttribute("href")!); // to copy text or html elements
  }

  logout() {
    sessionStorage.removeItem("loginObject");
    this.route.navigate(["/home"])
  }
}
