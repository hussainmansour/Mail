import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {UserDetailsService} from "../../../services/user-details.service";
import {UserRequestService} from "../../../services/user-request.service";
import {User} from "../../../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  signupform!: FormGroup;
  signinform!: FormGroup;

  isSuccessful = false;
  isSignUpFailed = false;

  roles: string[] = [];


  errorMessage = '';


  constructor(private route: Router, private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private userDetails:UserDetailsService,
              private userRequestService : UserRequestService) {
  }

  ngOnInit(): void {
    this.signupform = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
    this.signinform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    })
    this.signinform.get('email')?.valueChanges.subscribe((value) => {
      console.log(value);
    });
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton?.addEventListener('click', () => {
      container?.classList.add("right-panel-active");
      // this.signinform.reset();
      // this.signupform.reset();
    });

    signInButton?.addEventListener('click', () => {
      container?.classList.remove("right-panel-active");
      // this.signinform.reset();
      // this.signupform.reset();
    });

  }

  signin() {

    // let username = (<HTMLInputElement> document.getElementById("username")).value;
    // let password = (<HTMLInputElement> document.getElementById("password")).value;

    // console.log(username)
    // console.log(password)
    console.log(this.signinform);
    console.log(this.signinform.value.email);
    console.log(this.signinform.get('email'));

    console.log(this.signinform.status);


    let email = this.signinform.value.email
    let password = this.signinform.value.password

    let userData = {
      email: email,
      password: password
    }

    this.authService.login(userData).subscribe(
      data => {
        console.log(data);
        this.tokenStorageService.saveToken(data.access_token);
        this.tokenStorageService.decodeToken();
        //this.roles = this.tokenStorageService.decodeToken()["authority"];


        this.userRequestService.getUser(email).subscribe(user => {

          this.userDetails.client = user
          this.tokenStorageService.saveUser(user);
          this.route.navigate(['/home/inbox']);
        });

        //this.route.navigate(['/home']);
      },
      err => {
        alert("There is no account by such credentials");
      }
    );

    /*
    SEND REQUEST WITH THE USERNAME AND PASSWORD AND VALIDATE THE ACCOUNT
    RETYRN YES OR NO.
    */

    //F YES

    //IF NO DO NOTHING
    //alert("There is no account by such credintials");

  }

  signup() {


    console.log(this.signupform);
    //this.route.navigate(['/home/inbox']);
    // let name = (<HTMLInputElement> document.getElementById("name")).value;
    // let email = (<HTMLInputElement> document.getElementById("email")).value;
    // let pw = (<HTMLInputElement> document.getElementById("pw")).value;

    let name = this.signupform.value.name
    let email = this.signupform.value.email
    let password = this.signupform.value.password


    let userData = {
      name: name,
      email: email,
      password: password
    }

    this.authService.checkEmailTaken(email).subscribe( () => {
      this.authService.register(userData).subscribe(() => {
          this.isSuccessful = true;
          this.isSignUpFailed = false;

          const container = document.getElementById('container');
          container?.classList.add("right-panel-active");
          container?.classList.remove("right-panel-active");

          //this.route.navigate(['/home']).then(() => {});
          //this.reloadPage();
        }
      ,() => {
          alert("Invalid domain");
        });
    }, err => {
      alert("Email Already Taken");
    });


    /*
    SEND REQUEST WITH THE USERNAME AND PASSWORD AND VALIDATE THE ACCOUNT
    RETYRN YES OR NO.
    */

    //F YES
    //this.route.navigate(['/home']);

    //IF NO DO NOTHING
    //alert("There is no account by such credintials");

  }

}
