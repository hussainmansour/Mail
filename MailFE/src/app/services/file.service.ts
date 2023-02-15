import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private baseUrl = 'http://localhost:8080/api/cache';
  private baseUrlAttachment = 'http://localhost:8080/api/file';

  constructor(private http: HttpClient) { }

  upload(files: File[], mailDetailsId : string): Observable<any> {
    const formData: FormData = new FormData();
    console.log(files)
    for(let i=0;i<files.length;i++){
      formData.append('files',files[i])
    }
    formData.append('mail_details_id',mailDetailsId)
    console.log(formData.getAll('files'))
    const req = new HttpRequest('POST', `${this.baseUrlAttachment}/upload`, formData);

    return this.http.request(req);
  }


  generate(files: File[]): Observable<any> {
    const formData: FormData = new FormData();
    console.log(files)
    for(let i=0;i<files.length;i++){
      formData.append('file',files[i])
    }
    // formData.append('mail_id',id)
    console.log(formData.getAll('file'))
    const req = new HttpRequest('POST', `${this.baseUrl}/generateUrls`, formData);

    return this.http.request(req);
  }

  reset():Observable<any>{
    return this.http.get(`${this.baseUrl}/reset`)
  }
  // getFiles(): Observable<any> {
  //   return this.http.get(${this.baseUrl}/files);
  // }
}
