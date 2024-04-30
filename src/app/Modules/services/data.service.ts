import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../interfaces/user.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  userCreateData(data: any) {
    return this.http.post(`${environment.firebase.databaseURL}/user.json`, data)
  }

  getUserData(): Observable<user[]> {
    return this.http.get<user[]>(`${environment.firebase.databaseURL}/user.json`)
  }

  updateUser(data: any, key: string) {
    if (key && key !=" ")
      return this.http.put(`${environment.firebase.databaseURL}/user/${key}.json`, data);
    else
      return null
  }

}
