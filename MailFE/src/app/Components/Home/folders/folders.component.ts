import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {EmailService} from "../../../services/email.service";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.css']
})
export class FoldersComponent implements OnInit {
  folders:any[]=[]
  selectedfolders:any[]=[]
  pop=false;
  renam=false;
  selectedfolder:any
  user : any;

  constructor(private emailService : EmailService,
              private tokenStorageService : TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.tokenStorageService.getUser();

    this.emailService.getAllFolders(this.user["email"]).subscribe( data => {
      this.handle(data);
      console.log(data)
    })
  }

  handle(data:any){
    for(let i of data){
      this.folders.push({
        name:i,
        checked:false,
      });
    }
  }
  addfolder(){
    this.pop=true;
    console.log(this.folders);
  }
  savefolder(foldername:string){
    console.log(foldername);
    this.emailService.addFolder(this.user["email"],foldername);
    // this.folders.push({
    //   name: foldername,
    //   checked:false
    // });
    this.pop=false;
  }
  cancel(){
    this.pop=false;
    this.renam=false;
  }
  removeall(){
    for(let folder of this.folders){
      if(folder.checked){
        this.selectedfolders.push(folder.name);
        console.log(folder)
      }
    }
    console.log(this.selectedfolders)
    if(this.selectedfolders.length===0){
      alert("You should select folders to remove");
    }
    else{
      if(confirm("Are you sure you want to remove selected folders??")){
        this.emailService.deleteFolders(this.user["email"],this.selectedfolders);
        // for(let folder of this.selectedfolders){
        //   this.folders=this.folders.filter(x=>x.name!=folder.name);
        // }
      }
      this.selectedfolders=[];
    }
  }
  rename(folder:any){
    this.renam=true;
    this.selectedfolder=folder
  }
  savename(newname:string){
    console.log(newname);
    this.emailService.renameFolder(this.user["email"],this.selectedfolder.name,newname);
    // for(let i=0;i<this.folders.length;i++){
    //   if(this.folders[i].name==this.selectedfolder.name){
    //     this.folders[i].name=newname;
    //     break;
    //   }
    // }
    this.renam=false;
    this.selectedfolder=undefined
  }
  removefolder(folder:any){
      if(confirm("Are you sure you want to remove selected folder??")){
        this.selectedfolders.push(folder.name)
        // this.folders=this.folders.filter(x=>x.name!=folder.name);
        this.emailService.deleteFolders(this.user["email"],this.selectedfolders);
      }
      this.selectedfolders=[];
    }
}
