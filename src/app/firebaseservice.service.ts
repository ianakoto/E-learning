import { Injectable } from '@angular/core';
import { firestore } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';

import {MatSnackBar} from '@angular/material/snack-bar';

import {Fitems} from '../app/fitems';
import {Videomodule} from '../app/videomodule';
import {Notemodule} from '../app/notemodule';
import {Exercisemodule} from '../app/exercisemodule';
import { finalize } from 'rxjs/operators';

import * as Blob from 'blob';

@Injectable({
  providedIn: 'root'
})
export class FirebaseserviceService {

  items$: Observable<any>;
  task: AngularFireUploadTask;
  selectedFiles: FileList;
  activityData;
  uploadPercent: Observable<number>;
  snapshot: Observable<any>;
  downloadURL;

  constructor(
    private afs: AngularFirestore,
    public snackBar: MatSnackBar,
    private storage: AngularFireStorage
  ) {
  }



  uploadStorage(data: Videomodule, event) {

    const file = event[0];
    data.videos.forEach( (videos) => {
      const videotitle = Object.keys(videos).map(key => videos[key])[1];
      const videourl = Object.keys(videos).map(key => videos[key])[0];
      console.log( videotitle );
      console.log( videourl );






      const storageUrl = 'videos/';
      const storageRef = this.storage.ref(storageUrl + String(videotitle));


      const task = storageRef.put(file);
      // observe percentage changes
      this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      task
      .snapshotChanges()
      .pipe( finalize( () => {
        this.items$ = storageRef.getDownloadURL();
        this.items$.subscribe( mdata => {
          this.downloadURL = mdata;
          this.uploadvideo_data(data, this.downloadURL);
        });

      } ) ).subscribe();
      // .then(snapShot => {
      //   console.log(snapShot.downloadURL);
      //   this.downloadURL = snapShot.downloadURL ;
      //   this.uploadvideo_data(data, this.downloadURL);
      // }).catch( (error) => {
      //   this.openSnackBar('Failed to Upload Video reason: ' + error.message, 'Upload Error');
      // });

    });



  }

  uploadvideo_data(data: Videomodule, downloadurl) {
    const batch = this.afs.firestore.batch();

    data.subjects.forEach((subjectname) => {

      data.topics.forEach((topicname) => {

        data.lessons.forEach((lessonname) => {

          const svalues = Object.keys(subjectname).map(key => subjectname[key]);
          const tvalues = Object.keys(topicname).map(key => topicname[key]);
          const lvalues = Object.keys(lessonname).map(key => lessonname[key]);

          const videotitle = Object.keys(data.videos).map(key => data.videos[key])[0];
          const videourl = Object.keys(data.videos).map(key => data.videos[key])[1];


          this.afs
          .collection('class')
          .doc(data.class_no)
          .collection('subjects')
          .doc(svalues.toString())
          .collection('topics')
          .doc(tvalues.toString())
          .collection('lessons')
          .doc(lvalues.toString())
          .set({videoslist: {title: videotitle , url: downloadurl}})
          .then(() => {
            this.openSnackBar('Video Uploaded SuccessFully', 'Video Upload');
          })
          .catch((error) => {
            this.openSnackBar('Failed to Upload, reason' + error.message, 'Error Upload');
          });
        });


      } );

    });



  }

  uploadnote_data(data: Notemodule) {

    const batch = this.afs.firestore.batch();

    data.subjects.forEach((subjectname) => {

      data.topics.forEach((topicname) => {

        data.lessons.forEach((lessonname) => {

          const svalues = Object.keys(subjectname).map(key => subjectname[key]);
          const tvalues = Object.keys(topicname).map(key => topicname[key]);
          const lvalues = Object.keys(lessonname).map(key => lessonname[key]);

          this.afs
          .collection('class')
          .doc(data.class_no)
          .collection('subjects')
          .doc(svalues.toString())
          .collection('topics')
          .doc(tvalues.toString())
          .collection('lessons')
          .doc(lvalues.toString())
          .set({noteslist: data.notes})
          .then(() => {
            this.openSnackBar('Notes Uploaded SuccessFully', 'Note Upload');
          })
          .catch((error) => {
            this.openSnackBar('Failed to Upload, reason' + error.message, 'Error Upload');
          });
        });


      } );

    });


  }

  uploadexercise_data(data: Exercisemodule) {

    const batch = this.afs.firestore.batch();

    data.subjects.forEach((subjectname) => {

      data.topics.forEach((topicname) => {

        data.lessons.forEach((lessonname) => {

          const svalues = Object.keys(subjectname).map(key => subjectname[key]);
          const tvalues = Object.keys(topicname).map(key => topicname[key]);
          const lvalues = Object.keys(lessonname).map(key => lessonname[key]);

          this.afs
          .collection('class')
          .doc(data.class_no)
          .collection('subjects')
          .doc(svalues.toString())
          .collection('topics')
          .doc(tvalues.toString())
          .collection('lessons')
          .doc(lvalues.toString())
          .set({exerciselist: data.exercise})
          .then(() => {
            this.openSnackBar('Notes Uploaded SuccessFully', 'Note Upload');
          })
          .catch((error) => {
            this.openSnackBar('Failed to Upload, reason' + error.message, 'Error Upload');
          });
        });


      } );

    });


  }


  snakeActivity(value) {
    this.afs
          .collection('activity').doc('games').update({snake: value})
          .then(() => {
            this.openSnackBar('Snake Activity set SuccessFully', 'Activity Change');
          })
          .catch((error) => {
            this.openSnackBar('Failed to Change Activity State, reason' + error.message, 'Activity Change');
          });
  }

  lineActivity(value) {
    console.log(value);
    this.afs
          .collection('activity').doc('games').update({line: value})
          .then(() => {
            this.openSnackBar('Line Activity set SuccessFully', 'Activity Change');
          })
          .catch((error) => {
            this.openSnackBar('Failed to Change Activity State, reason' + error.message, 'Activity Change');
          });
  }

  threesActivity(value) {
    this.afs
          .collection('activity').doc('games').update({threes: value})
          .then(() => {
            this.openSnackBar('Threes Activity set SuccessFully', 'Activity Change');
          })
          .catch((error) => {
            this.openSnackBar('Failed to Change Activity State, reason' + error.message, 'Activity Change');
          });
  }

  getActivities() {
    return this.afs
    .collection('activity')
    .doc('games')
    .snapshotChanges();
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: 'top',
    });
  }

}
