import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UrlService } from '../helper/urlservice';
import { environment } from '../../environments/environment.development';
@Injectable({
  providedIn: 'root',
})

export class ApiService {

  baseUrl = "http://98.130.6.30:8000/v1/"
  constructor(private http: HttpClient) { }
  
  // private activeMenu = new BehaviorSubject<any>(''); // Using BehaviorSubject to keep the latest value
  // selectedMenu$ = this.activeMenu.asObservable(); // Expose as Observable

  login(body: any): Observable<any> {
    return this.http
      .post(this.baseUrl+'user/login', body)
      // .pipe(catchError(this.err.handleError));
  }
  // login(body: any): Observable<any> {
  //   return this.http
  //     .post(this.baseUrl+'user/login', body)
  //     // .pipe(catchError(this.err.handleError));
  // }

  // setActiveMenu(menu: any) {
  //   this.activeMenu.next(menu);
  // }

  // getActiveMenu() {
  //   return this.activeMenu.getValue();
  // }
  // deleteRepo(ep: any): Observable<any> {
  //   return this.http.delete(this.url.getHttpUrl('deleteRepo') + ep);
  // }
  // downloadPDF(body: any): Observable<any> {
  //   return this.http
  //     .post(this.url.getHttpUrl('downloadPDF'), body, {
  //       responseType: 'arraybuffer' as 'json',
  //       observe: 'response',
  //     })
  //     .pipe();
  // }
  // getpricingData(extendUrl: any): Observable<any> {
  //   return this.http.get(this.url.getHttpUrl('getpricingData') + extendUrl, {
  //     observe: 'response',
  //   });
  // }
  // indexRemoteDocument(body: any): Observable<any> {
  //   return this.http.post(this.url.getHttpUrl('loadSingelIndex'), body, {
  //     observe: 'response',
  //   });
  // }
}
