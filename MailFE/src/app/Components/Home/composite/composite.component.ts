import { FileService } from './../../../services/file.service';
import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import { MailService } from 'app/services/mail.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Email } from 'app/email';
import {TokenStorageService} from "../../../services/token-storage.service";
import {EmailService} from "../../../services/email.service";

@Component({
  selector: 'app-composite',
  templateUrl: './composite.component.html',
  styleUrls: ['./composite.component.css']
})
export class CompositeComponent implements OnInit {
  selectedFiles?: FileList;
  files:File[]=[]
  currentFile?: File;
  receivers:FormControl[]=[]
  fileInfos:any[]=[];
  composeform!:FormGroup
  email ? :Email
  emailid? : string|null
  emails : Email[] = []


  constructor(private activatedroute:ActivatedRoute,
              private mailservice : MailService,
              private fileservice:FileService,
              private tokenStorageService : TokenStorageService,
              private emailService : EmailService) { }



  ngOnInit(): void {
      this.emailid=this.activatedroute.snapshot.paramMap.get("id");
      this.email=this.mailservice.emails.find(x=> x.mail_id==this.emailid);
      this.emails=this.mailservice.emails;
      this.composeform=new FormGroup({
          to: new FormArray([new FormControl("",[Validators.required,Validators.email])]),
          subject:new FormControl(""),
          reply:new FormControl(""),
          priority:new FormControl("1")
        });
      if(this.emailid!=null){


        let ob = JSON.stringify(this.email)
        let json = JSON.parse(ob);

        console.log(json["recievers"]);
        this.composeform.setValue({
          to: json["recievers"],
          subject:this.email?.subject,
          reply:this.email?.message,
          priority:this.email?.priority
        });
        let mailId = String(this.emailid);

        this.emailService.getFiles(mailId).subscribe(data => {
          this.manage(data);
        });
      }
      else{
        this.fileservice.reset().subscribe(value=>{
          console.log(value);
        });
      }
  }



  manage(data:any){
    for (let i of data){
      this.fileInfos.push({
        name:i.name,
        url:i.url
      });
    }
    console.log(this.files);
    console.log(data);
  }



  addreciever(){
    (<FormArray>this.composeform.get("to")).push(new FormControl("",[Validators.required,Validators.email]))
  }



  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
    if(this.selectedFiles){
      for(let i=0;i<this.selectedFiles.length;i++){
        this.currentFile=this.selectedFiles[i];
        this.files.push(this.currentFile);
      }
    }
    this.fileservice.generate(this.files).subscribe(value=>{
      this.evaluate(value);
    });
  }
  evaluate(value:any){
    this.fileInfos=value.body;
    console.log(this.files);
    console.log(this.currentFile);
    console.log(this.selectedFiles);
    console.log(this.fileInfos);
    this.selectedFiles=undefined
  }


  upload(mailDetailsId : string): void {
    if(this.files.length!=0){
      this.fileservice.upload(this.files,mailDetailsId).subscribe(responsedata=>{
        console.log(responsedata);
      });
      // this.fileInfos=this.service.getFiles();
    }
    this.files=[]
  }

  send(){



    let to = this.composeform.value.to;
    let subject = this.composeform.value.subject;
    let priority = this.composeform.value.priority;
    let message = this.composeform.value.reply;

    let user = this.tokenStorageService.getUser();
    let sender = user['email'];
    let email = new Email(null,subject,message,priority,null,{
      "sender" : sender,
      "reciever" : to
    }, null,null);

    console.log(email);

    let mailId = "";

    this.emailService.compose(email).subscribe(data => {
      let json = JSON.stringify(data);
      mailId = JSON.parse(json)['mail_details_id'];
      this.upload(mailId);

      this.hand(data);
    });

    if (this.emailid != null){
      this.emailService.eraseMails([this.emailid]);
    }

    //we take id here
    // this.upload(id)
  }

  hand(data:any){
    console.log(data);
    this.discard();
  }



  discard(){
    this.composeform.reset({
      to:'',
      subject:'',
      reply:'',
      priority:'1'
    })
    this.files=[]
    this.fileInfos=[]
    this.fileservice.reset().subscribe(value=>{
        console.log(value);
    });

  }
  draft(){

    let to = this.composeform.value.to;
    let subject = this.composeform.value.subject;
    let priority = this.composeform.value.priority;
    let message = this.composeform.value.reply;

    let user = this.tokenStorageService.getUser();
    let sender = user['email'];
    let email = new Email(null,subject,message,priority,null,{
      "sender" : sender,
      "reciever" : to
    }, null,null);

    console.log(email);

    if (this.emailid != null){
      this.emailService.eraseMails([this.emailid]);
    }

    this.emailService.saveToDraft(email).subscribe(data => {
      this.hand(data);
    });
  }

}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

function send() {
  throw new Error('Function not implemented.');
}

