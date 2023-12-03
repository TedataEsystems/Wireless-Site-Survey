import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Iregister } from "../model/register";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class RegisterService {
  constructor(private HttpClient: HttpClient) {}
  Register(model: Iregister) {
    return this.HttpClient.post<any>(
      `${environment.API_URL}Account/register`,
      model
    );
  }
}
