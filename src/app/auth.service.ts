import { Injectable, NgZone} from '@angular/core';
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
import { FirebaseserviceService } from './firebaseservice.service';



export interface UserDD {

    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    emailVerified: string;
    rdate: string;

}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$;

  constructor(
    public afAuth: AngularFireAuth,
    public router: Router,
    private afs: AngularFirestore,
    public snackBar: MatSnackBar,
    public ngZone: NgZone,
    private fireService: FirebaseserviceService
  ) {


    // we subscribe to the authentication state; if the user is logged in,
    // we add the user's data to the browser's local storage; otherwise we store a null user:
    this.afAuth.authState.subscribe(user => {
      if (user) {
        console.log(user.displayName);
        this.user$ = user;
        localStorage.setItem('user', JSON.stringify(this.user$));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });


  }


  async login(usert: Usert, submitted) {

    if (submitted) {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(usert.email, usert.password)
      .then((resultd) => {
        if (resultd.user.emailVerified !== true) {
          // tslint:disable-next-line:max-line-length
          this.openSnackBar('Kindly check your inbox, We have sent you an Email. Please validate your email address.' , 'Email Verification');
          this.sendEmailVerification();
        } else {
          this.fireService.setActiveUsers();
          this.ngZone.run(() => {
            this.router.navigate(['classroom']);
          });
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

  this.AuthLogin(new auth.GoogleAuthProvider());

}


  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
       this.ngZone.run(() => {
          console.log(result.user.emailVerified);
          if ( result.user.emailVerified !== true) {
            // tslint:disable-next-line:max-line-length
            this.openSnackBar('Kindly check your inbox, We have sent you an Email. Please validate your email address.' , 'Email Verification');
            this.sendEmailVerification();

          } else {
            localStorage.setItem('user', JSON.stringify(result.user));
            this.fireService.setActiveUsers();
            this.ngZone.run(() => {
              this.router.navigate(['classroom']);
            });

          }

        });
       this.SetUserData(result.user);
    }).catch((error) => {
      this.openSnackBar(`Login Failed reason:' ${error.message}`, 'Login');
    });
  }


async signInAdmin(usert: Usert) {
  const result = await (await this.afAuth.auth.signInWithEmailAndPassword(usert.email, usert.password)).user.uid;
  if (result === 'RvxCOoQa0pXCFh1P6C2J3ARDRMj1') {

    this.router.navigateByUrl('/admindashboard');
  } else {
    // tslint:disable-next-line:max-line-length
    this.openSnackBar('You are not an admin, Cannot log you into the admin, please return to the homepage and login into the classroom', 'Login');
    this.router.navigateByUrl('/');
  }



}



async sendEmailVerification() {
  await this.afAuth.auth.currentUser.sendEmailVerification()
  .then(() => {
    const datenow = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    const user = this.afAuth.auth.currentUser;
    const userData  = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      rdate: datenow
    };
    this.SetUserData(userData);
    this.router.navigate(['classroom']);
  });


  // this.router.navigate(['admin/verify-email']);
}


SetUserData(user) {
  const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  const datenow = formatDate(new Date(), 'yyyy/MM/dd', 'en');
  const userData: UserDD = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    rdate: datenow
  };
  return userRef.set(userData, {
    merge: true
  });
}


openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 6000,
    verticalPosition: 'top',
    panelClass: ['beauty-snackbar'],
  });
}


}
