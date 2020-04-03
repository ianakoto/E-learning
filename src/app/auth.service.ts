import { Injectable } from '@angular/core';
import { User } from 'firebase';
import {Usert } from 'src/app/usert';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    public snackBar: MatSnackBar
  ) {


    // we subscribe to the authentication state; if the user is logged in,
    // we add the user's data to the browser's local storage; otherwise we store a null user:
    this.afAuth.authState.subscribe(user => {
      if ( user != null) {
        if (user) {
          this.user = user;
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          this.openSnackBar('Login Failed', 'Login');
          localStorage.setItem('user', null);
        }
      }

    });
  }


  async login(usert: Usert, submitted) {

    if (submitted) {
      console.log(usert);
      const result = await this.afAuth.auth.signInWithEmailAndPassword(usert.email, usert.password)
      .then(() => {
        this.router.navigate(['classroom']);
      } )
      .catch((error) => {
        this.openSnackBar('Login Failed', 'Login');
      } );
    }

}



  async logout() {
    await this.afAuth.auth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['/']);
  }

  get isLoggedIn(): boolean {
    const  user  =  JSON.parse(localStorage.getItem('user'));
    return  user  !==  null;
}

async  loginWithGoogle() {
  await  this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider() )
  .then( () => {
    this.router.navigate(['classroom']);
  })
  .catch( (error) => {
    this.openSnackBar('Login Failed', 'Login');
    this.router.navigate(['/']);
  } );

}

async signInAdmin(usert: Usert) {
  const result = await (await this.afAuth.auth.signInWithEmailAndPassword(usert.email, usert.password)).user.uid;
  if (result === '3hGpuhH7KcdbkBqNLUJZ6WYPBX13') {
    this.router.navigateByUrl('/admindashboard');
  } else {
    // tslint:disable-next-line:max-line-length
    this.openSnackBar('You are not an admin, Cannot log you into the admin, please return to the homepage and login into the classroom', 'Login');
    this.router.navigateByUrl('/');
  }

}


openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 20000,
    verticalPosition: 'top',
    panelClass: ['beauty-snackbar'],
  });
}


}
