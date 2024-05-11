import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhoneCountriesAPIService {
  
  private apiUrl = environment.countriesCodes;

  constructor(private http: HttpClient) { }

  getCountryData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
