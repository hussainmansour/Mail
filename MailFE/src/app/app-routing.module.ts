import { FoldermailsComponent } from './Components/Home/folders/foldermails/foldermails.component';
import { MailComponent } from './Components/Home/inbox/mail/mail.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompositeComponent } from './Components/Home/composite/composite.component';
import { DraftsComponent } from './Components/Home/drafts/drafts.component';
import { FoldersComponent } from './Components/Home/folders/folders.component';
import { HomeComponent } from './Components/Home/home/home.component';
import { InboxComponent } from './Components/Home/inbox/inbox.component';
import { SentComponent } from './Components/Home/sent/sent.component';
import { TrashComponent } from './Components/Home/trash/trash.component';
import { LoginComponent } from './Components/Login/login/login.component';
import { ContactsComponent } from './Components/Home/contacts/contacts.component';

const routes: Routes = [
  {path: "home", component:HomeComponent,children:[
    {path: "inbox", component:InboxComponent},
    {path: "inbox/:id", component:MailComponent},
    {path: "sent", component:SentComponent},
    {path: "sent/:id", component:MailComponent},
    {path: "drafts", component:DraftsComponent},
    {path: "drafts/:id", component:CompositeComponent},
    {path: "trash", component:TrashComponent},
    {path: "trash/:id", component:MailComponent},
    {path: "folder", component:FoldersComponent},
    {path: "folder/:name",component:FoldermailsComponent},
    {path: "folder/:name/:id",component:MailComponent},
    {path: "composite", component:CompositeComponent},
    {path: "contacts", component:ContactsComponent}

  ]},
  {path: "", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
