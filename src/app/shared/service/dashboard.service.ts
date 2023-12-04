import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private HttpClient: HttpClient) {}
  GraphDataCount():Observable<any> {
    return this.HttpClient.get(`${environment.API_URL}Home/GraphDataCount`);
  }

  GraphDataJson() {
    return this.HttpClient.get(`${environment.API_URL}Home/GraphDataJson`);
  }
}
