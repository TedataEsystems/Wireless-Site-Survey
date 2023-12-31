import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
 

  constructor(private httpClient: HttpClient) { }
  getReportLists(): Observable<any> {
    console.log("from service")
    return this.httpClient.get<any>(`${environment.API_URL}Requests/GetReportLists`);
  }
  getReportResults(report:any): Observable<any> {
    console.log("from report search service")
    return this.httpClient.post<any>(`${environment.API_URL}Requests/GetReportResults`,report);
  }
}
