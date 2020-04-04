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
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private afs: AngularFirestore,
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
      const result = await this.afAuth.auth.signInWithEmailAndPassword(usert.email, usert.password)
      .then((resultd) => {
        if (resultd.user.emailVerified !== true) {
          this.openSnackBar('Please validate your email address. Kindly check your inbox.' , 'Email Verification');
          this.sendEmailVerification();
        } else {
          console.log('gfgfgf');
          this.router.navigate(['classroom']);
        }

      } )
      .catch((error) => {
        this.openSnackBar('Login Failed reason:' + error.message, 'Login');
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
  .then( (result) => {
    if (result.user.emailVerified !== true) {
      this.openSnackBar('Please validate your email address. Kindly check your inbox.' , 'Email Verification');
      this.sendEmailVerification();
    } else {
      this.router.navigate(['classroom']);
    }
  }).catch((er) => {
    this.openSnackBar('Login Failed reason:' + er.message, 'Login');
  });


}


async signInAdmin(usert: Usert) {
  const result = await (await this.afAuth.auth.signInWithEmailAndPassword(usert.email, usert.password)).user.uid;
  if (result === 'eFkMW5DD6CPG6KuVF0HmoKDt1us2') {

    this.router.navigateByUrl('/admindashboard');
  } else {
    // tslint:disable-next-line:max-line-length
    this.openSnackBar('You are not an admin, Cannot log you into the admin, please return to the homepage and login into the classroom', 'Login');
    this.router.navigateByUrl('/');
  }



}




async sendEmailVerification() {
  await this.afAuth.auth.currentUser.sendEmailVerification();
  this.router.navigate(['classroom']);

  // this.router.navigate(['admin/verify-email']);
}


openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 20000,
    verticalPosition: 'top',
    panelClass: ['beauty-snackbar'],
  });
}


}
