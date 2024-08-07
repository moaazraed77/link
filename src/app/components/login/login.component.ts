import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Modules/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../Modules/css-styles/user-forms-style.css']
})
export class LoginComponent {

  constructor(private formBuilder: FormBuilder, private authServ: AuthService
    , private toastr: ToastrService, private route: Router) {
    if (sessionStorage.getItem("loginObject")) {
      this.route.navigate(["/mylinks"])
    }
  }

  loginData = this.formBuilder.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  })

  loginObject: any = {};

  load: boolean = false;

  signIn() {
    this.load = true
    this.authServ.signIn(this.loginData.value).then(async user => {
      user.user.getIdTokenResult(false).then(token => {
        this.loginObject.token = token.token;
        this.loginObject.authTime = token.authTime;
      });
      this.loginObject.uid = user.user.uid;
      sessionStorage.setItem("loginObject", JSON.stringify(this.loginObject))
      this.toastr.success("تم تسجيل الدخول بنجاح")
      this.route.navigate(["/mylinks"])
    }).catch(err => {
      if (err.message.includes("invalid-login-credentials")) {
        this.toastr.error("check your email or password")
      } else if (err.message.includes("try again later")) {
        this.toastr.error("many failed login attempts","try again later")
      } else {
        this.route.navigate(["/sign-up"])
        this.toastr.error("يرجي انشاء الحساب الخاص بك ")
      }
      this.load = false
    });
  }

}
