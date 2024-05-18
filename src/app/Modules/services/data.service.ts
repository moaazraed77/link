import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { analytics } from '../interfaces/analytics.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // get user data 
  getUserData(): Observable<user[]> {
    return this.http.get<user[]>(`${environment.firebase.databaseURL}/user.json`)
  }
  // create user data 
  userCreateData(data: any) {
    return this.http.post(`${environment.firebase.databaseURL}/user.json`, data)
  }
  // update user data 
  updateUser(data: any, key: string) {
    if (key && key != " ")
      return this.http.put(`${environment.firebase.databaseURL}/user/${key}.json`, data);
    else
      return null
  }

  // create analytics 
  getUserAnalytics(): Observable<analytics[]> {
    return this.http.get<analytics[]>(`${environment.firebase.databaseURL}/Analytics.json`)
  }
  // create analytics 
  createUserAnalytics(data: any) {
    return this.http.post(`${environment.firebase.databaseURL}/Analytics.json`, data).subscribe();
  }
  // update analytics 
  updateUserAnalytics(data: any, key: string) {
    if (key && key != " ")
      return this.http.put(`${environment.firebase.databaseURL}/Analytics/${key}.json`, data).subscribe();
    else
      return null
  }

}
