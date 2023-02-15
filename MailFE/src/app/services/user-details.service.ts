import { Injectable } from '@angular/core';
import {User} from "../user";

@Injectable({
  providedIn: 'root'
})
export class UserDetailsService {

  client : User = new User(1,2,3,4,5,6,7)

  constructor() {}
}

/*
{
  "user_id": "ff80818185717f540185718f72bc0002",
  "name": "amr",
  "email": "amr@gmail.com",
  "password": "$2a$10$LmhuTEliwECoMhhJc0Qj/uga1OgTwYRvd3EbuUmEd2.zD0LIINm8K",
  "role": "user",
  "custom_folders": [],
  "contacts": []
}
*/
