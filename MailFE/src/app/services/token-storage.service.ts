import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  decodedToken!: { [key: string]: string };

  constructor() {}

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    let token = sessionStorage.getItem(TOKEN_KEY);
    return token == null ? "" : token;
  }

  public saveUser(user: any) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY,
      JSON.stringify(user));
  }

  public getUser() {
    let userKey = sessionStorage.getItem(USER_KEY);
    return userKey == null ? "" : JSON.parse(userKey);
  }

  public decodeToken() {
    if (this.getToken()) {
      this.decodedToken = jwt_decode(this.getToken());
    }
    return this.decodedToken;
  }

  private getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken['exp'] : null;
  }

  public isTokenExpired(): boolean {
    const expiryTime: string | null = this.getExpiryTime();
    if (expiryTime) {
      return ((1000 * parseInt(expiryTime)) - (new Date()).getTime()) < 5000;
    } else {
      return false;
    }
  }
}
