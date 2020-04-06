import { Component, OnInit } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { Datm } from '../subject/subject.component';
import { FirebaseserviceService } from 'src/app/firebaseservice.service';
import { DocumentChangeAction, QueryDocumentSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-lessonshome',
  templateUrl: './lessonshome.component.html',
  styleUrls: ['./lessonshome.component.css']
})
export class LessonshomeComponent implements OnInit {

  public topicname;
  isSubmitted = true;
  mitems = [];
  lessons = [];
  noSubject = 'No lessons to Display';
  items: DocumentChangeAction<unknown>[];
  // docchange: DocumentChangeAction<>;
  Useritems$: QueryDocumentSnapshot<unknown>;
  matmodule: Datm;

  constructor( public router: ActivatedRoute, private firebaseService: FirebaseserviceService, public mrouter: Router ) { }

  ngOnInit(): void {
    this.router.queryParamMap
    .subscribe( (val) => this.topicname = val);
    const lvalues = Object.keys(this.topicname).map(key => this.topicname[key]);
    this.topicname = lvalues[0].topic;

    this.firebaseService
    .getmaterialdata()
    .subscribe( data => {
      const itemsm = data ;
      itemsm.map( mdata => {
        this.matmodule = mdata.payload.doc.data() as Datm;
        if ( this.matmodule.lesson != null) {
          if (this.matmodule.topic === String(this.topicname).toLowerCase()) {
            if ( !this.lessons.includes(this.matmodule.lesson.toUpperCase()) ) {

              this.lessons.push(this.matmodule.lesson.toUpperCase());
              if (this.lessons.length > 0 ) {
                this.isSubmitted = false;
              }
            }
          }

        }

      });

    });






 }


 enterclass(param) {

  const navigationExtras: NavigationExtras = {
    queryParams: {
       lesson: param
    },
};
  this.mrouter.navigate(['classroom/tutor'], navigationExtras);

 }


}
