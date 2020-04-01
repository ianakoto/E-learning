import { Injectable } from '@angular/core';
import { Register } from './register';

import { User } from 'firebase';
import {Usert } from 'src/app/usert';

import { auth } from 'firebase/app';
import { firestore } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

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
        if ( res.user.email != null) {
          this.afs.collection('users').add(
            {
              email: value.email,
              studen_name: value.student,
              parent_name: value.parent,
              phone: value.phone
            }).then( () => {
                // pop up show successfull and rout
                this.openSnackBar('Registration Successfull', 'Registration', popupstyle);
                this.router.navigate(['classroom']);
            } )
            .catch((error) => {
              // registration failed
              console.log(error);
              this.openSnackBar('Registration Failed, reason: ' + error.message, 'Registration', popupstyle);
              this.router.navigate(['register']);
            } );
        }

      })
      .catch( (error) => {
      this.openSnackBar('Registration Failed, reason: ' + error.message, 'Registration', popupstyle);
      });
    }

    openSnackBar(message: string, action: string, style: string) {
      this.snackBar.open(message, action, {
        duration: 20000,
        verticalPosition: 'top',
        panelClass: [style],
      });
    }



}
