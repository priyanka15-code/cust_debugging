import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environment/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiurl = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }

  register(userdata: any ):Observable<any>{
    return this.http.post(`${this.apiurl}users`,userdata)
  }

  login(userdata: any): Observable<any>{
    return this.http.post(`${this.apiurl}users/login`,userdata).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token); 
/*           console.log('Login successful, token saved');
 */        }
      })
    );
  }

  Login(userdata: any, token?: string): Observable<any> {
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : {};
    return this.http.post(`${this.apiurl}users/dev-Login`, userdata, { headers }).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
/*           console.log('Developer login success, token saved');
 */        }
      })
    );
  }

  // Admin API to login as a customer by their email
  adminlogin(userdata:any,token?:string): Observable<any>{
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : {};
    return this.http.post(`${this.apiurl}users/admin-login-as-customer`,userdata, {headers}).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
     /*      console.log('Developer login in customer dashborad success, token saved'); */
        }
      })
    )
  }

   // get product

   getUser (): Observable<any>{
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiurl}users`,{ headers} )
  }

  //Get token from localStorage
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Attach Authorization header with token
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return token ? new HttpHeaders({ 'Authorization': `Bearer ${token}` }) : new HttpHeaders();
  }
  //console.log show and hidden
  log(message: any) {
    if (!environment.production) {
      console.log(message);
    }
  }

  error(message: any) {
    if (!environment.production) {
      console.error(message);
    }
  }

  getProtectedData(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiurl}users/protected`, { headers });
  }
  
  //new product

  newProdct(productdata: any): Observable<any>{
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiurl}product`,productdata,{ headers })
  }


  // get by CustomerID

  getbyIdproduct(): Observable<any>{
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiurl}product/byid`, { headers})
  }
  // get product

  getProduct (): Observable<any>{
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiurl}product`,{ headers} )
  }
}
