import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../environment/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiurl =  environment.apiBaseUrl  /* 'http://localhost:3000/api/' */ ;
 private isLog: boolean = false;
  constructor(private http: HttpClient) { }

  register(userdata: any ):Observable<any>{
    return this.http.post(`${this.apiurl}users`,userdata)
  }

  login(userdata: any): Observable<any>{
    return this.http.post(`${this.apiurl}users/login`,userdata).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token); 
          localStorage.setItem('user', JSON.stringify(response.user));
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
          localStorage.setItem('user', JSON.stringify(response.user)); 
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
          localStorage.setItem('user', JSON.stringify(response.user));
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

    // Fetch the user from localStorage
    private getCurrentUser(): any {
      const userJson = localStorage.getItem('user');
      return userJson ? JSON.parse(userJson) : null;
    }
  
    log(message: any, type: 'log' | 'warn' | 'info' | 'error', response?: any) {
      const user = this.getCurrentUser();
      
      if (user && user.isLog !== undefined) {
        if (user.isLog === true) {
          switch (type) {
            case 'log':
              console.log(message);
              if (response) console.log('Response:', response);
              break;
            case 'warn':
              console.warn(message);
              break;
            case 'info':
              console.info(message);
              break;
            case 'error':
              console.error(message);
              if (response) console.error('Response:', response);
              break;
            default:
              console.log(message);
          }
        } else {
          console.log(); 
        }
      } else {
        console.log(); 
      }
    }
 
  updateUserStatus(sEmail: string, isActive: boolean, token: string): Observable<any> {
    const headers = token ? new HttpHeaders({ Authorization: `Bearer ${token}` }) : new HttpHeaders();
    const payload = { sEmail, isActive };
    
    return this.http.put(`${this.apiurl}users/update-status`, payload, { headers });
  }

  setUserLogStatus(user: any) {
    this.isLog = user.isLog; 
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
