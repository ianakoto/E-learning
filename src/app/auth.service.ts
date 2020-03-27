import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }



  public signInAdmin(userData: User) {
    localStorage.setItem('ACCESS_TOKEN_ADMIN', 'access_token_admin');
  }



  public isLoggedInAdmin() {
    return localStorage.getItem('ACCESS_TOKEN_ADMIN') !== null;
  }



  public logoutAdmin() {
    localStorage.removeItem('ACCESS_TOKEN_ADMIN');
  }

  public signIn(userData: User) {
    localStorage.setItem('ACCESS_TOKEN', 'access_token');
  }

  public isLoggedIn() {
    return localStorage.getItem('ACCESS_TOKEN') !== null;
  }

  public logout() {
    localStorage.removeItem('ACCESS_TOKEN');
  }

}
