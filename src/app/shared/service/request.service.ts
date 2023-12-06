import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequest } from '../model/IReuest';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private HttpClient : HttpClient) { }
  getRequests(): Observable<any[]>{
    return this.HttpClient.get<any[]>(`${environment.API_URL}Requests`);
  }
  AddReuest(data:IRequest ):Observable<any>
  {
   return this.HttpClient.post<any>(`${environment.API_URL}Requests/AddReuest`,data);  
  }
}
