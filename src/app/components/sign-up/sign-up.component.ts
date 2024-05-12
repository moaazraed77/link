import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Modules/services/auth.service';
import { CheckUsernameService } from 'src/app/Modules/services/check-username.service';
import { DataService } from 'src/app/Modules/services/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss', '../../Modules/css-styles/user-forms-style.css']
})
export class SignUpComponent {

  constructor(private formBuilder: FormBuilder, private authServ: AuthService,
    private chechUserServ: CheckUsernameService, private toastr: ToastrService,
    private dataServ: DataService, private route: Router) { }
  // sign Up Data value for create user 
  signUpData = this.formBuilder.group({
    email: ["", [Validators.required,Validators.email]],
    password: ["", Validators.required],
    userName: ["", Validators.required],
    Name: ["",[Validators.required, Validators.minLength(3)]],
    X: [""],
    snapchat: [""],
    facebook: [""],
    instagram: [""],
    whatsapp: [""],
    tiktok: [""],
    photoUrl: [""],
    bgUrl: [""],
    location: [""],
    userId: [""],
  })

  load: boolean = false;

  loginObject: any = {};

  async signUp() {
    this.load = true;
    let isUserBefore = false
    // get users data to check the username is used-- before or not
    this.dataServ.getUserData().subscribe(value => {
      for (const key in value) {
        if (value[key].userName == this.signUpData.value.userName!) {
          isUserBefore = true;
          break;
        }
      }
      if (isUserBefore) {
        this.toastr.error("يرجي اختيار اسم مستخدم مختلف ", "اسم المستخدم موجود ")
        this.load = false;

        // check if the data entered are valid to signup
      } else if (this.signUpData.valid) {
        {
          // create user && check the user is signed up before or not
          this.authServ.signUp(this.signUpData.value).then(async user => {
            // add token as a practice
            
            // await user.user.getIdTokenResult(false).then(token => {
            //   this.loginObject.token = token.token;
            //   this.loginObject.authTime = token.authTime;
            // });
            // save user id
            this.loginObject.uid = user.user.uid;
            this.signUpData.patchValue({
              userId: user.user.uid
            })
            // save the local Storage data 
            localStorage.setItem("loginObject", JSON.stringify(this.loginObject))
            this.dataServ.userCreateData(this.signUpData.value).subscribe(data => {
              this.route.navigate(["/mylinks"]);
              this.toastr.success("تم انشاء الحساب الخاص بك بنجاح")
            })
          }).catch((reject) => {
            // if()
            this.route.navigate(["/login"])
            this.toastr.error(" يرجي تسجيل الدخول ", "ايميل موجود مسبقا")
          })
        }
      } else {
        this.toastr.error("املئ جميع الخانات")
        this.load = false;
      }
    });
  }

  get signUpControls(){
    return this.signUpData.controls;
  }

}
