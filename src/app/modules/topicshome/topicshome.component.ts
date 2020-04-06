import { Component, OnInit } from '@angular/core';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { FirebaseserviceService } from 'src/app/firebaseservice.service';
import { DocumentChangeAction, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Datm } from '../subject/subject.component';

@Component({
  selector: 'app-topicshome',
  templateUrl: './topicshome.component.html',
  styleUrls: ['./topicshome.component.css']
})
export class TopicshomeComponent implements OnInit {

  isSubmitted = true;
  public subjectname;

  mitems = [];
  topics = [];
  noTopic = 'No topics to Display';

  items: DocumentChangeAction<unknown>[];
  // docchange: DocumentChangeAction<>;
  Useritems$: QueryDocumentSnapshot<unknown>;
  matmodule: Datm;



  constructor(public router: ActivatedRoute, private firebaseService: FirebaseserviceService, public mrouter: Router ) { }

  ngOnInit(): void {
    this.router.queryParamMap
    .subscribe( (val) => this.subjectname = val);
    const lvalues = Object.keys(this.subjectname).map(key => this.subjectname[key]);
    this.subjectname = lvalues[0].subject;

    this.firebaseService
    .getmaterialdata()
    .subscribe( data => {
      const itemsm = data ;
      itemsm.map( mdata => {
        this.matmodule = mdata.payload.doc.data() as Datm;
        if ( this.matmodule.subject != null) {
          if (this.matmodule.subject === String(this.subjectname).toLowerCase()) {
            if ( !this.topics.includes(this.matmodule.topic.toUpperCase()) ) {

              this.topics.push(this.matmodule.topic.toUpperCase());

              if (this.topics.length > 0 ) {
                this.isSubmitted = false;
              }
            }
          }

        }

      });

    });

  }


  enterLesson(param) {

    const navigationExtras: NavigationExtras = {
      queryParams: {
         topic: param
      },
  };
    this.mrouter.navigate(['classroom/lessons'], navigationExtras);
   }

}
