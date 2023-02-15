import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MailComponent} from './Components/Home/inbox/mail/mail.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './Components/Home/home/home.component';
import {LoginComponent} from './Components/Login/login/login.component';
import {InboxComponent} from './Components/Home/inbox/inbox.component';
import {SentComponent} from './Components/Home/sent/sent.component';
import {DraftsComponent} from './Components/Home/drafts/drafts.component';
import {TrashComponent} from './Components/Home/trash/trash.component';
import {FoldersComponent} from './Components/Home/folders/folders.component';
import {CompositeComponent} from './Components/Home/composite/composite.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AuthInterceptor} from "./services/auth-interceptor.service";
import { FoldermailsComponent } from './Components/Home/folders/foldermails/foldermails.component';
import { ContactsComponent } from './Components/Home/contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DraftsComponent,
    InboxComponent,
    SentComponent,
    TrashComponent,
    FoldersComponent,
    CompositeComponent,
    MailComponent,
    FoldermailsComponent,
    ContactsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule, FormsModule, ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
