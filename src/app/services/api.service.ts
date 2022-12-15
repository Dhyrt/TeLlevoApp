import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  async get(){
    return await this.http.get('https://api.openweathermap.org/data/2.5/weather?lat=-33.597835629011804&lon=-70.57911395425506&appid=864a1666ca8c3c9b1d3d468559f16665&lang=es&units=metric');
  }
}
