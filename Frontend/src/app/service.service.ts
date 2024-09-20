import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiurl = 'http://localhost:3000/api/';
  constructor(private http: HttpClient) { }

  register(userdata: any ):Observable<any>{
    return this.http.post(`${this.apiurl}users`,userdata)
  }

  login(userdata: any): Observable<any>{
    return this.http.post(`${this.apiurl}users/login`,userdata).pipe(
      tap((response: any) => {
        if (response && response.token) {
          localStorage.setItem('token', response.token); 
          console.log('Login successful, token saved');
        }
      })
    );
  }

  Login(userdata: any): Observable<any>{
    return this.http.post(`${this.apiurl}`,userdata).pipe(
      tap((response: any) => {
        if(response && response.token){
          localStorage.setItem('token',response.token);
          console.log('Admin login success, token saved');
        }
      })
    )
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
