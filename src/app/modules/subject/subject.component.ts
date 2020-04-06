import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router, NavigationExtras } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FirebaseserviceService } from 'src/app/firebaseservice.service';
import { DocumentChangeAction, QueryDocumentSnapshot } from '@angular/fire/firestore';


export interface Datm {
  class: string;
  subject: string;
  topic: string;
  lesson: string;
  data: object;


}


@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.css']
})
export class SubjectComponent implements OnInit {

  public classname;
  isSubmitted = true;
  mitems = [];
  subjects = [];
  noSubject = 'No Subjects to Display';

  items: DocumentChangeAction<unknown>[];
  // docchange: DocumentChangeAction<>;
  Useritems$: QueryDocumentSnapshot<unknown>;
  matmodule: Datm;

  constructor( public router: ActivatedRoute, private firebaseService: FirebaseserviceService, public mrouter: Router ) { }

  ngOnInit(): void {
    this.router.queryParamMap
    .subscribe( (val) => this.classname = val);
    const lvalues = Object.keys(this.classname).map(key => this.classname[key]);
    this.classname = lvalues[0].class;
    console.log(this.classname);
    this.firebaseService
    .getmaterialdata()
    .subscribe( data => {
      const itemsm = data ;
      itemsm.map( mdata => {
        this.matmodule = mdata.payload.doc.data() as Datm;
        if ( this.matmodule.class != null && this.matmodule.class === String(this.classname).toLowerCase()) {
            if ( !this.subjects.includes(this.matmodule.subject.toUpperCase()) ) {
              this.subjects.push(this.matmodule.subject.toUpperCase());

              if (this.subjects.length > 0 ) {
                this.isSubmitted = false;
              }
            }

        }

      });

    });






 }


 enterTopic(param) {

  const navigationExtras: NavigationExtras = {
    queryParams: {
       subject: param
    },
};
  this.mrouter.navigate(['classroom/topics'], navigationExtras);

 }




}
