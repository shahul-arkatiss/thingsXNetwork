import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  httpUrl: any = new BehaviorSubject<any>({});
  constructor() {}
  setPropertiesUrl(url: any): void {
    console.log('setPropertiesUrl', url);
  
    this.httpUrl.next(url);
  }
  getHttpUrl(serviceName: any) {
  
    if (this.httpUrl._value) {
      console.log('httpUrl._value:---', this.httpUrl._value);
      const data: any = this.httpUrl._value[serviceName];
      let url = data?.serverHost + (data?.endPoint ? data?.endPoint : '');
      console.log('getHttpUrl--URL---->', url);
      return url;
    } else {  
      return;
    }
  }
}
