export class User {

  user_id? : any;
  email? : any;
  name? : any;
  password? : any;
  role? : any;
  custom_folders? : any;
  contacts? : any;

  constructor(user_id:any, email:any, name:any, password:any, role:any, custom_folders:any, contacts:any) {
    this.user_id = user_id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.role = role;
    this.custom_folders = custom_folders;
    this.contacts = contacts;
  }


}
