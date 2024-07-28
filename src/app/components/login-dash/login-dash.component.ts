import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Modules/services/auth.service';

@Component({
  selector: 'app-login-dash',
  templateUrl: './login-dash.component.html',
  styleUrls: ['./login-dash.component.scss']
})
export class LoginDashComponent {
  error:boolean=false;

  constructor(private fb:FormBuilder ,private route:Router,private auth:AuthService) { }

  login=this.fb.group({
    email:["",Validators.required],
    pass:["",Validators.required],
  })

  ngOnInit(): void {
  }

  submit(){
    this.auth.loginDash(this.login.value).then(()=>{
      sessionStorage.setItem("dash","is Admin");
      this.route.navigate(["/adm/dash-home"])
    }).catch(()=>{
      sessionStorage.setItem("Admin","is False not Admin")
      this.error=true;
    });
  }
}
