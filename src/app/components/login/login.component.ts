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
    , private toastr: ToastrService, private route: Router) { }

  loginData = this.formBuilder.group({
    email: ["", Validators.required],
    password: ["", Validators.required],
  })

  loginObject: any = {};

  load: boolean = false;

  async signIn() {
    this.load = true
    await this.authServ.signIn(this.loginData.value).then(async user => {
      await user.user.getIdTokenResult(false).then(token => {
        this.loginObject.token = token.token;
        this.loginObject.authTime = token.authTime;
      });
      this.loginObject.uid = user.user.uid;
      localStorage.setItem("loginObject", JSON.stringify(this.loginObject))
      this.route.navigate(["/profile"])
      this.toastr.success("تم تسجيل الدخول بنجاح")
    }).catch(err => {
      this.route.navigate(["/sign-up"])
      this.toastr.error("يرجي انشاء الحساب الخاص بك ")
    });
  }

}
