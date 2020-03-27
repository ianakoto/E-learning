import { Injectable } from '@angular/core';
import { Register } from './register';

@Injectable({
  providedIn: 'root'
})
export class RegisterationService {

  constructor() { }


  public register(userData: Register) {
    return true;
  }
}
