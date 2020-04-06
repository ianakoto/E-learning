import { Injectable } from '@angular/core';
import { Register } from './register';

import { User } from 'firebase';
import {Usert } from 'src/app/usert';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { formatDate } from '@angular/common';
import { UserDD } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RegisterationService {

  user$: Observable<Register>;

  item: AngularFirestoreDocument;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    public snackBar: MatSnackBar,
    public router: Router ) { }

    doRegister(value: Register, popupstyle: string) {
      return this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.pwd)
      .then(res => {
        this.sendEmailVerification();
      })
      .catch( (error) => {
      this.openSnackBar('Sign Up Failed, reason: ' + error.message, 'Sign Up', popupstyle);
      });
    }

    openSnackBar(message: string, action: string, style: string) {
      this.snackBar.open(message, action, {
        duration: 8000,
        verticalPosition: 'top',
        panelClass: [style],
      });
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


}
