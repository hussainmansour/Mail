import {Component, DoCheck, OnInit} from '@angular/core';
import {MailService} from '../../../services/mail.service';
import {Email} from 'app/email';
import {UserDetailsService} from "../../../services/user-details.service";
import {EmailService} from "../../../services/email.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {UserRequestService} from "../../../services/user-request.service";

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  user: any;
  emails: Email[] = [];
  selectedEmails: Email[] = [];
  folderNames: string[] = [];
  diselect: boolean = false;
  index: any = 0
  size: number = 0;

  constructor(private mailService: MailService,
              private userDetails: UserDetailsService,
              private emailService: EmailService,
              private userRequestService: UserRequestService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {

    this.selectedEmails = []
    this.diselect = false;

    this.user = this.tokenStorageService.getUser();
    this.folderNames = this.user["custom_folders"];

    this.userRequestService.getUser(this.user["email"]).subscribe(user => {
      this.tokenStorageService.saveUser(user);
    });

    this.emailService.getFolderSize(this.user["email"], "Inbox").subscribe(data => {
      this.setSize(data);
    });

    this.emailService.getInbox(this.user["email"], "0").subscribe(data => {
      this.setEmails(data)

      /*for (let email of this.emails){

        let tempEmail : Email = email;

        let recievers = tempEmail['recievers'];
        let newRecievers = []

        for (let reciever of recievers){

          let name = "";
          this.userRequestService.getUserName(reciever).subscribe(data => {
            let json = JSON.stringify(data);
            name = JSON.parse(json);
          });


          newRecievers.push({
            "name" : name,
            "email" : reciever
          });
        }

        email.mail['reciever'] = newRecievers;
      }


      console.log(this.emails);*/
    });

    this.mailService.emails = this.emails;
  }

  setSize(data : any) {
    let json = JSON.stringify(data);
    let ob = JSON.parse(json);
    this.size = Math.ceil(ob / 12);
    console.log(this.size);
  }

  setEmails(data: any) {
    let arr = data as Email[]
    console.log("aaaa");
    console.log(data);
    this.emails = arr;
    this.mailService.emails = this.emails;
  }

  newest() {
    this.emailService.getInboxSortedBy(this.user["email"], "0", "sended_at").subscribe(data => {
      this.setEmails(data);
    })
  }

  priority() {
    this.emailService.getInboxSortedBy(this.user["email"], "0", "priority").subscribe(data => {
      this.setEmails(data);
    })

  }

  pagPrev() {
    this.index = Math.max(0, this.index - 1)
    this.emailService.getInbox(this.user["email"], this.index.toString()).subscribe(data => {
      this.setEmails(data)
    });
  }

  pagNext(){
    this.index = Math.min(this.size - 1, this.index + 1);
    this.emailService.getInbox(this.user["email"], this.index.toString()).subscribe(data => {
      this.setEmails(data);
    });
  }

  addEmail(event: any) {

    let id = event.target.id;
    if (event.target.checked === true) {
      let found = this.emails.find((obj) => {
        return obj.mail_id == id;
      });
      this.selectedEmails.push(found!);
    } else {
      let found = this.emails.find((obj) => {
        return obj.mail_id == id;
      });
      let index = this.selectedEmails.indexOf(found!);
      this.selectedEmails.splice(index, 1);
    }

  }

  toggleBg(event: any) {

    let ob = event.target;
    if (ob.checked === true) {
      document.getElementsByName(event.target.id)[0].style.background = "#ececed";
    } else {
      document.getElementsByName(event.target.id)[0].style.background = "#ffffff";
    }

  }

  selectAll() {

    if (this.diselect === false) {
      this.diselect = true;
      this.selectedEmails = [];
      for (let i = 0; i < this.emails.length; i++) {
        let id = this.emails[i].mail_id;
        if (id != undefined) {
          let checkbox = document.getElementById(id.toString()) as HTMLInputElement | null;
          if (checkbox != null) {
            checkbox.checked = true;
            document.getElementsByName(id.toString())[0].style.background = "#ececed";
            this.selectedEmails.push(this.emails[i]);
          }
        }
      }
    } else {
      this.diselect = false;
      this.selectedEmails = [];
      for (let i = 0; i < this.emails.length; i++) {
        let id = this.emails[i].mail_id;
        if (id != undefined) {
          let checkbox = document.getElementById(id.toString()) as HTMLInputElement | null;
          if (checkbox != null) {
            checkbox.checked = false;
            document.getElementsByName(id.toString())[0].style.background = "#ffffff";
          }
        }
      }
    }

  }

  delete() {

    let arr = [];
    for (let i = 0; i < this.selectedEmails.length; i++) {
      arr.push(this.selectedEmails[i].mail_id);
    }
    this.emailService.deleteMails(arr);
    window.location.reload()

  }

  moveToFolder(event: any) {

    let btn = event.target as HTMLButtonElement;
    let name = btn.innerHTML;
    let arr = [];
    for (let i = 0; i < this.selectedEmails.length; i++) {
      arr.push(this.selectedEmails[i].mail_id);
    }
    this.emailService.moveToFolder(arr, name);
    window.location.reload();

  }

  search() {

    let element1 = document.querySelector('#by') as HTMLInputElement;
    let element2 = document.getElementById('search') as HTMLInputElement;
    let searchBy = element1.value;
    let searchText = element2.value;

    this.emailService.searchInInbox(this.user["email"], searchBy, "0", searchText).subscribe(data => {
      this.setEmails(data)
    })

  }

  sort() {

    let element1 = document.querySelector('#by') as HTMLInputElement;
    let sortBy = element1.value;

    this.emailService.getInboxSortedBy(this.user["email"], "0", sortBy).subscribe(data => {
      this.setEmails(data)
    })

  }

  public formatDate(date: any) {
    return new Date(date * 1000).toUTCString();
  }
}
