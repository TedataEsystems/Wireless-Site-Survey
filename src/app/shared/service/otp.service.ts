import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iotp } from '../model/opt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(private HttpClient : HttpClient) { }
  SendOtpCode(email:any){
    return this.HttpClient.get<any>(`${environment.API_URL}Otp/`+ email)
  }

  OtpVerificationRequest(model:Iotp){
    return this.HttpClient.post<any>(`${environment.API_URL}Otp/verify/`,model)
  }
 
}
