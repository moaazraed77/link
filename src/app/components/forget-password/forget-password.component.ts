import { Component } from '@angular/core';
import { Auth, EmailAuthCredential, sendPasswordResetEmail } from '@angular/fire/auth';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {

  forget = this.formBuilder.group({
    email: ["", Validators.required]
  })

  constructor(private formBuilder: FormBuilder, private auth: Auth) { }

  submit() {
    if (this.forget.valid)
      sendPasswordResetEmail(this.auth,this.forget.value.email!).then((resolve)=>{
      alert("(noreply) ستصلك رسالة لتغيير كلمة المرور من \n You will receive a message to change your password from (noreply)")
    })
  }

}
