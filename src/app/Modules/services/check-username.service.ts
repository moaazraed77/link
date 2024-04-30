import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { user } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class CheckUsernameService {

  constructor(private http: HttpClient) { }

  usernameCheck(userName: string) {
    let isUserBefore: boolean = false;
    return this.http.get<user[]>(`${environment.firebase.databaseURL}/user.json`)
  }

}
