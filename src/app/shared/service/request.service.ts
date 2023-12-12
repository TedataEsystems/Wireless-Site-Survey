import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRequest } from '../model/IReuest';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { INote } from '../model/INote';
import { INoteEntity } from '../model/INoteEntity';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private HttpClient : HttpClient) { }
  getRequests(): Observable<any[]>{
    return this.HttpClient.get<any[]>(`${environment.API_URL}Requests`);
  }
  getRequestById(id: number): Observable<any> {
    return this.HttpClient.post<any>(`${environment.API_URL}Requests/GetRequestById`, id);
  }
  AddReuest(data:IRequest ):Observable<any>
  {
   return this.HttpClient.post<any>(`${environment.API_URL}Requests/AddReuest`,data);  
  }
  getRequestsPendingVendor(): Observable<any>{
    return this.HttpClient.get<any>(`${environment.API_URL}Requests/PendingVendor`);
  }
  getRequestsPendingPresales(): Observable<any>{
    return this.HttpClient.get<any>(`${environment.API_URL}Requests/PendingPresales`);
  }
  getRequestsPendingSales(): Observable<any>{
    return this.HttpClient.get<any>(`${environment.API_URL}Requests/PendingSales`);
  }
  getRequestsCompleted(): Observable<any>{
    return this.HttpClient.get<any>(`${environment.API_URL}Requests/Completed`);
  }
  AddNote(model:INote): Observable<any>{
    return this.HttpClient.post<any>(`${environment.API_URL}Requests/AddNotes`,model);  
  }
  upload(file: any,  requestId : Number , toId : Number , fileName : string): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.HttpClient.post<any>(`${environment.API_URL}Requests/UploadedFile/`+ requestId + `/` + toId+'/'+fileName, formData);
  }
  DownloadAttach(id: number): Observable<any> {
    return this.HttpClient.get(`${environment.API_URL}Requests/DownloadFile/`+ id);
  }
  DeleteAttachFile(id: number): Observable<any> {
    return this.HttpClient.delete<any>(`${environment.API_URL}Requests/DeleteFile/` + id);
  }
  getRequestHistory(id: number): Observable<any> {
    return this.HttpClient.post<any>(`${environment.API_URL}Requests/RequestHistory`, id);
  }
}
