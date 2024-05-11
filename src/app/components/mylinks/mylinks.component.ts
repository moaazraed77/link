import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { user } from 'src/app/Modules/interfaces/user.interface';
import { DataService } from 'src/app/Modules/services/data.service';
import { PhoneCountriesAPIService } from 'src/app/Modules/services/phone-countries-api.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';  // write this special code for upload img 

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
  profile = this.formBuilder.group({
    email: [""],
    password: [""],
    Name: [""],
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
  countries: any[] = [];
  arr: any[] = [];
  partView: string = "home";
  uploading: string = ""
  photoUrl: string = ""
  imgFile: any;

  constructor(private dataServ: DataService, private PhoneCountriesAPI: PhoneCountriesAPIService,
    private formBuilder: FormBuilder, private toastr: ToastrService, private firestorage: AngularFireStorage) {

    PhoneCountriesAPI.getCountryData().subscribe(data => {
      for (let i = 0; i < data.length; i++) {
        if (i == 44 || i == 63)
          continue
        this.countries.push(data[i].idd.root + data[i].idd.suffixes[0])
      }
      this.countries.sort()
    })

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
          Name: this.currentUser.Name,
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

  submit() {
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
    }
    this.submit();
  }



  // for upload image 
  uploadPromo(event: any) {
    let loader = new FileReader();
    this.imgFile = event.target.files[0]
    loader.readAsDataURL(event.target.files[0])
    loader.onload = (event) => {
      this.photoUrl = event.target?.result?.toString()!;
    }
  }

  async uploadPhoto() {
    this.uploading = "uploadingImage";
    if (this.imgFile) {
      const path = `ecommerce/${new Date().getTime()}${this.imgFile.name}`; // we make name of file in firebase storage 
      const uploadTask = await this.firestorage.upload(path, this.imgFile)
      const url = await uploadTask.ref.getDownloadURL()
      this.profile.patchValue({
        photoUrl: url
      })
      this.uploading = "uploadedImage";
    }
    this.submit()
  }

}
