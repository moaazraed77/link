import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhoneCountriesAPIService {
  
  private apiUrl = environment.countriesCodes;

  countries: any[] = [];

  constructor(private http: HttpClient) { }

  getCountryData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // getCountriesArray(){
  //   this.getCountryData().subscribe(data => {
  //     for (let i = 0; i < data.length; i++) {
  //       if (i == 44 || i == 63)
  //         continue
  //       this.countries.push(data[i].idd.root + data[i].idd.suffixes[0])
  //     }
  //     this.countries.sort().reverse()
  //   })
  //   return this.countries
  // }
}
