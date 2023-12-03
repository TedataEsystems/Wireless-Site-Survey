import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Login } from '../model/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private HttpClient : HttpClient) { }
  Login(model:Login){
    return this.HttpClient.post<any>(`${environment.API_URL}Account/login`,model)
  }
}
