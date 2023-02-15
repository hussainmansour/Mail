import { Email } from './../../../../email';
import { MailService } from '../../../../services/mail.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {EmailService} from "../../../../services/email.service";

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {

  email?  :Email;
  emailid? : string|null
  emails : Email[] = []
  files:any[]=[{
    name:'',
    url:''
  }]
  filenames:any[]=[];
  fileurls:any[]=[];

  constructor(private activatedroute:ActivatedRoute,
              private mailservice:MailService,
              private emailService : EmailService) { }

  ngOnInit(): void {

    this.emailid=this.activatedroute.snapshot.paramMap.get("id");
    this.email=this.mailservice.emails.find(x=> x.mail_id==this.emailid);
    this.emails=this.mailservice.emails;
    console.log(this.mailservice.emails);

    let mailId = String(this.emailid);

    this.emailService.getFiles(mailId).subscribe(data => {
      this.manage(data);
    });

    // console.log(this.email)
    // this.emails=this.emails.filter(x=> x.id!=this.emailid);

  }
  manage(data:any){
    for (let i of data){
      this.filenames.push(i.name);
      this.fileurls.push(i.url);
      this.files.push({
        name:i.name,
        url:i.url
      });
    }
    console.log(this.filenames);
    console.log(this.fileurls);
    console.log(this.files);
    console.log(data);
  }

  prev() {

    let index = this.emails.indexOf(this.email!);

    if(index - 1 >= 0) {
      this.email = this.emails[index - 1];
    }

  }

  next() {

    let index = this.emails.indexOf(this.email!);

    if(index + 1 < this.emails.length) {
      this.email = this.emails[index + 1];
    }

  }

  public formatDate(date: any) {
    return new Date(date * 1000).toUTCString();
  }
}
