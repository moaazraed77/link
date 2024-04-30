import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClientModule , private auth:Auth) { }

  signIn(data:any){
    return signInWithEmailAndPassword(this.auth,data.email, data.password)
  }

  signUp(data:any){
    return createUserWithEmailAndPassword(this.auth,data.email, data.password)
  }


}
