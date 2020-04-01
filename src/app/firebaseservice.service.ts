import { Injectable } from '@angular/core';
import { firestore } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import {MatSnackBar} from '@angular/material/snack-bar';

import {Fitems} from '../app/fitems';
import {Videomodule} from '../app/videomodule';
import {Notemodule} from '../app/notemodule';
import {Exercisemodule} from '../app/exercisemodule';

@Injectable({
  providedIn: 'root'
})
export class FirebaseserviceService {


  constructor(
    private afs: AngularFirestore,
    public snackBar: MatSnackBar,
  ) {
  }


  uploadvideo_data(data: Videomodule) {
    const batch = this.afs.firestore.batch();
    data.subjects.forEach((subjectitem) => {

      data.topics.forEach((topicitem) => {

        data.lessons.forEach((lessonitem) => {

          const dir = 'video/' + data.class + '/' + subjectitem + '/' + topicitem + '/' + lessonitem;

          batch.set(this.afs.collection(dir).doc(), data.videos);
        });


      } );

    });



  }

  uploadnote_data(data: Notemodule) {

  }

  uploadexercise_data(data: Exercisemodule) {

  }


}
