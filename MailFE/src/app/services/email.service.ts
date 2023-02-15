import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Email} from "../email";
import { User } from 'app/user';


const MAIL_API = 'http://localhost:8080/api/mail/';
const USER_API = 'http://localhost:8080/api/user/';
const File_API = 'http://localhost:8080/api/file/'


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) {}

  public getFiles(mailId : string){
    return this.http.put(File_API + "getFiles" , {
      "mail_id" : mailId
    });
  }

  public uploadFile(files: File[], mailDetailsId : string){
    return this.http.post(File_API + "upload", {
      "mail_details_id" : mailDetailsId
    });
  }

  public getInbox(userEmail: string, index: string) {
    return this.http.post(MAIL_API + "inbox", {
      "user_email": userEmail,
      "page_index": index
    });
  }

  public getInboxSortedBy(userEmail: string, index: string, sortCol: string) {
    return this.http.post(MAIL_API + "inbox", {
      "user_email": userEmail,
      "page_index": index,
      "sort_column": sortCol
    });
  }

  public getDraft(userEmail: string, index: string) {
    return this.http.post(MAIL_API + "draft", {
      "user_email": userEmail,
      "page_index": index
    },);
  }

  public getDraftSortedBy(userEmail: string, index: string, sortCol: string) {
    return this.http.post(MAIL_API + "draft", {
      "user_email": userEmail,
      "page_index": index,
      "sort_column": sortCol
    });
  }

  public getTrash(userEmail: string, index: string) {
    return this.http.post(MAIL_API + "trash", {
      "user_email": userEmail,
      "page_index": index
    },);
  }

  public getTrashSortedBy(userEmail: string, index: string, sortCol: string) {
    return this.http.post(MAIL_API + "trash", {
      "user_email": userEmail,
      "page_index": index,
      "sort_column": sortCol
    });
  }

  public getSent(userEmail: string, index: string) {
    return this.http.post(MAIL_API + "sent", {
      "user_email": userEmail,
      "page_index": index
    });
  }

  public getSentSortedBy(userEmail: string, index: string, sortCol: string) {
    return this.http.post(MAIL_API + "", {
      "user_email": userEmail,
      "page_index": index,
      "sort_column": sortCol
    });
  }


  public getCustomFolder(folder : string, userEmail: string, index: string) {
    return this.http.post(MAIL_API + "loadCustomFolder", {
      "folder" : folder,
      "user_email": userEmail,
      "page_index": index
    });
  }

  public getCustomFolderSortedBy(folder : string, userEmail: string, index: string,sortCol: string) {
    return this.http.post(MAIL_API + "loadCustomFolder", {
      "folder" : folder,
      "user_email": userEmail,
      "page_index": index,
      "sort_column": sortCol
    });
  }

  public getFolderSize(userEmail : string, folderName : string){
    return this.http.put(MAIL_API + "getFolderSize",{
      "user_email" : userEmail,
      "folder_name" : folderName
    })
  }


  public searchInInbox(userEmail : string, column : string,index : string,key : string){
    return this.http.post(MAIL_API + "searchInInbox" , {
      "user_email"  : userEmail,
      "page_index" : index,
      "column" : column,
      "key" : key
    });
  }

  public searchInSent(userEmail : string, column : string,index : string,key : string){
    return this.http.post(MAIL_API + "searchInSentOrDraft" , {
      "folder" : "Sent",
      "user_email"  : userEmail,
      "page_index" : index,
      "column" : column,
      "key" : key
    });
  }

  public searchInDraft(userEmail : string, column : string,index : string,key : string){
    return this.http.post(MAIL_API + "searchInSentOrDraft" , {
      "folder" : "Draft",
      "user_email"  : userEmail,
      "page_index" : index,
      "column" : column,
      "key" : key
    });
  }

  public searchInTrash(userEmail : string, column : string,index : string,key : string){
    return this.http.post(MAIL_API + "searchInTrash" , {
      "user_email"  : userEmail,
      "page_index" : index,
      "column" : column,
      "key" : key
    });
  }

  public searchInFolder(userEmail : string,folder : string, column : string,index : string,key : string){
    return this.http.post(MAIL_API + "searchInFolder" , {
      "folder" : folder,
      "user_email"  : userEmail,
      "page_index" : index,
      "column" : column,
      "key" : key
    });
  }


  public deleteMails(mailIds : string[]){
    return this.http.put(MAIL_API + "deleteMails", {
      "mail_ids" : mailIds
    }).subscribe();
  }

  public moveToFolder(mailIds : string[], folder : string){
    return this.http.put(MAIL_API + "moveMailTo", {
      "mail_ids" : mailIds,
      "newfolder_name" : folder
    }).subscribe();
  }

  public eraseMails(mailIds : string[]){
    return this.http.put(MAIL_API + "eraseMails", {
      "mail_ids" : mailIds
    }).subscribe();
  }


  public compose(email : Email){
    return this.http.post(MAIL_API + "compose" , email);
  }

  public saveToDraft(email : Email){
    return this.http.post(MAIL_API + "saveToDraft", email);
  }


  public restoreMails(mailIds : any){
    return this.http.put(MAIL_API + "restoreMails", {
      "mail_ids" : mailIds
    }).subscribe();
  }


  public getAllContacts(userId : string){
    return this.http.put(USER_API + "getAllContacts" , {
      "user_id" : userId
    });
  }

  public getAllContactsSortedBy(userId : string, column : string){
    return this.http.put(USER_API + "getAllContacts" , {
      "user_id" : userId,
      "column" : column
    });
  }

  public searchInContacts(userId : string, col : string, key : string){
    return this.http.put(USER_API + "searchInContacts" , {
      "user_id" : userId,
      "col" : col,
      "key" : key
    });
  }

  public addContact(name : string, emails : any, user_id : any) {
    return this.http.post(USER_API + "addContact", {
      "name": name,
      "emails": emails,
      "user": {
          "user_id": user_id
      }
    });
  }

  public deleteContacts(user_id : string, contact_ids : any) {
    return this.http.put(USER_API + "deleteContacts", {
      "user_id": user_id,
      "contact_ids": contact_ids
    });
  }

  public updateContactName(contact_id : string, new_name : string) {
    return this.http.put(USER_API + "updateContactName", {
      "contact_id": contact_id,
      "new_name": new_name
    });
  }

  public addEmailToContact(contact_id : string, email : string) {
    return this.http.post(USER_API + "addEmailToContact", {
      "contact_id": contact_id,
      "email": email
    });
  }

  public deleteEmailsFromContact(contact_id : string, emails : any) {
    return this.http.put(USER_API + "deleteEmailsFromContact", {
      "contact_id": contact_id,
      "emails": emails
    });
  }

  public addFolder(userEmail : string, folderName : string){
    this.http.post(USER_API + "addFolder" , {
      "user_email" : userEmail,
      "folder_name" : folderName
    }).subscribe()
  }

  public renameFolder(userEmail : string , oldFolderName : string, newFolderName : string){
    this.http.put(USER_API + "renameFolder" , {
      "user_email" : userEmail,
      "oldfolder_name" : oldFolderName,
      "newfolder_name" : newFolderName
    }).subscribe()
  }

  public deleteFolders(userEmail : string , foldersNames : any){
    this.http.put(USER_API + "deleteFolders" , {
      "user_email" : userEmail,
      "folders_names" : foldersNames
    }).subscribe()
  }

  public getAllFolders(userEmail : string){
    return this.http.put(USER_API + "getAllFolders" , {
      "user_email"  : userEmail
    });
  }

}
