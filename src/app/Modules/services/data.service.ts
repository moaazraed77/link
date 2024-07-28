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

  apiLink =environment.firebase.databaseURL;
  constructor(private http: HttpClient) { }

  // get user data 
  getUserData(): Observable<user[]> {
    return this.http.get<user[]>(`${this.apiLink}/user.json`)
  }
  // create user data 
  userCreateData(data: any) {
    this.http.post(`${this.apiLink}/user-copy.json`, data)
    return this.http.post(`${this.apiLink}/user.json`, data)
  }
  // update user data 
  updateUser(data: any, key: string) {
    if (key && key != " ")
      return this.http.put(`${this.apiLink}/user/${key}.json`, data);
    else
      return null
  }

  // create analytics 
  getUserAnalytics(): Observable<analytics[]> {
    return this.http.get<analytics[]>(`${this.apiLink}/Analytics.json`)
  }
  // create analytics 
  createUserAnalytics(data: any) {
    this.http.post(`${this.apiLink}/Analytics-copy.json`, data).subscribe()
    return this.http.post(`${this.apiLink}/Analytics.json`, data).subscribe();
  }
  // update analytics 
  updateUserAnalytics(data: any, key: string) {
    if (key && key != " ")
      return this.http.put(`${this.apiLink}/Analytics/${key}.json`, data).subscribe();
    else
      return null
  }
  
  // **************************************************************************************************

  getPartiners(){
    return this.http.get(`${this.apiLink}/partiners.json`)
  }

  createPartiner(data:any){
    this.http.post(`${this.apiLink}/partiners-copy.json`,data)
    return this.http.post(`${this.apiLink}/partiners.json`,data)
  }

  updatePartiner(data:any,key:string){
    return this.http.put(`${this.apiLink}/partiners/${key}.json`,data)
  }

  deletePartiner(key:string){
    return this.http.delete(`${this.apiLink}/partiners/${key}.json`)
  }


}
