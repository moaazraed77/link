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

  arabCountryCodes:any = [
    { country: "السعودية", code: "+966" },
    { country: "الإمارات العربية المتحدة", code: "+971" },
    { country: "مصر", code: "+20" },
    { country: "العراق", code: "+964" },
    { country: "الكويت", code: "+965" },
    { country: "البحرين", code: "+973" },
    { country: "عمان", code: "+968" },
    { country: "قطر", code: "+974" },
    { country: "الأردن", code: "+962" },
    { country: "لبنان", code: "+961" },
    { country: "سوريا", code: "+963" },
    { country: "اليمن", code: "+967" },
    { country: "فلسطين", code: "+970" },
    { country: "ليبيا", code: "+218" },
    { country: "تونس", code: "+216" },
    { country: "الجزائر", code: "+213" },
    { country: "المغرب", code: "+212" },
    { country: "السودان", code: "+249" },
    { country: "موريتانيا", code: "+222" },
    { country: "جيبوتي", code: "+253" },
    { country: "جزر القمر", code: "+269" },
    { country: "الصومال", code: "+252" }
];


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
