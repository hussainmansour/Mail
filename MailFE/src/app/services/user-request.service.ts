import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";


const USER_API = 'http://localhost:8080/api/user/';



@Injectable({
  providedIn: 'root'
})
export class UserRequestService {

  constructor(private http: HttpClient) {}

  public getUser(userEmail : string){
    return this.http.put(USER_API + "getUser",{"user_email" : userEmail});
  }

  public getUserName(userEmail : string){
    return this.http.put(USER_API + "getUserName" , {
      "user_email" : userEmail
    });
  }

}
