import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  getUsers(): Observable<any> {
    console.log("from service")
    return this.httpClient.get<any>(`${environment.API_URL}Account/GetUsers`);
  }
  getUsersGroups(): Observable<any> {
    console.log("from service")
    return this.httpClient.get<any>(`${environment.API_URL}Account/GetUserGroups`);
  }
  deleteUser(id:number):Observable<any>
  {
    return this.httpClient.delete<any>(`${environment.API_URL}Account/DeleteUser/`+id);
  }
  resetPassword(userPass:any):Observable<any>
  {
    return this.httpClient.post<any>(`${environment.API_URL}Account/resetPassword`,userPass);  
  }
  
}
