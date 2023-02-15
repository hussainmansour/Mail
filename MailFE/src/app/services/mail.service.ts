import { Injectable } from '@angular/core';
import { Email } from '../email';

@Injectable({
  providedIn: 'root'
})
export class MailService {

  emails : Email[] = [];
  receivers:any[]=[];

  constructor() {
    // let msg : string = "Hello Mohamed, How are you now!, we are having alot of assignments and i can't handle it so help me if you can help me i need it please to ";
    // this.emails.push(new Email("asd@gmail.com","Amr Ahmed","MohamedAnwar@gmail.com","25 Dec",msg,1,1))
    // this.emails.push(new Email("asd@gmail.com","Amr Ahmed","MohamedAnwar@gmail.com","25 Dec",msg,2,1))
    // this.emails.push(new Email("asd@gmail.com","Amr Ahmed","MohamedAnwar@gmail.com","25 Dec",msg,3,2))
    // this.emails.push(new Email("asd@gmail.com","Amr Ahmed","MohamedAnwar@gmail.com","25 Dec",msg,4,3))
    // this.emails.push(new Email("asd@gmail.com","Amr Ahmed","MohamedAnwar@gmail.com","25 Dec",msg,5,4))
    // this.emails.push(new Email("asd@gmail.com","Amr Ahmed","MohamedAnwar@gmail.com","25 Dec",msg,6,5))
    // this.emails.push(new Email("asd@gmail.com","Amr Ahmed","MohamedAnwar@gmail.com","25 Dec",msg,7,2))
    // this.emails.push(new Email("asd@gmail.com","Amr Ahmed","MohamedAnwar@gmail.com","25 Dec",msg,8,3))
    // this.emails.push(new Email("asd@gmail.com","Amr Ahmed","MohamedAnwar@gmail.com","25 Dec",msg,9,2))
    // this.emails.push(new Email("asd@gmail.com","Amr Ahmed","MohamedAnwar@gmail.com","25 Dec",msg,10,1))
    // this.emails.push(new Email("asd@gmail.com","Amr Ahmed","MohamedAnwar@gmail.com","25 Dec",msg,11,2))
    // this.emails.push(new Email("asd@gmail.com","Amr Ahmed","MohamedAnwar@gmail.com","25 Dec",msg,12,3))
  }



}
