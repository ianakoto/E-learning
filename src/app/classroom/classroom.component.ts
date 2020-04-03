import { Component, OnInit } from '@angular/core';
import { Datm } from '../modules/subject/subject.component';
import { FirebaseserviceService } from '../firebaseservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentChangeAction, QueryDocumentSnapshot } from '@angular/fire/firestore';


export interface FireData {
   exerciselist: object;
   noteslist: object;
   videoslist: object;
}

export interface ExerData {
   item: Array<object>;
}

export interface NotData {
  text: string;
}

export interface VIdData {
  streamurl: string;
  title: object;
}

export interface TitleData {
  title: string;
  url: string;
}


@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.css']
})
export class ClassroomComponent implements OnInit {
  public lessonname;

  mitems = [];
  datalist = [];
  noSubject = 'No lessons to Display';
  items: DocumentChangeAction<unknown>[];
  // docchange: DocumentChangeAction<>;
  Useritems$: QueryDocumentSnapshot<unknown>;
  matmodule: Datm;

  totaldata: FireData;
  exerdata: Array<object>;
  notedata: Array<object>;
  videodata: VIdData;
  titledata: TitleData;
  videourl: string;
  videotitle: string;
  exercise: string;
  answer: string;
  note: string;
  getex: {test: string, options: string};
  getnot: {text: string };
  putexe = [];
  putnote = [];
  viewanser: boolean;

  constructor( public router: ActivatedRoute, private firebaseService: FirebaseserviceService, public mrouter: Router ) { }

  ngOnInit(): void {
    this.router.queryParamMap
    .subscribe( (val) => this.lessonname = val);
    const lvalues = Object.keys(this.lessonname).map(key => this.lessonname[key]);
    this.lessonname = lvalues[0].lesson;

    this.firebaseService
    .getmaterialdata()
    .subscribe( data => {
      const itemsm = data ;
      itemsm.map( mdata => {
        this.matmodule = mdata.payload.doc.data() as Datm;
        if ( this.matmodule.data != null) {
          if (this.matmodule.lesson === String(this.lessonname).toLowerCase()) {
            this.totaldata = this.matmodule.data as FireData;

            this.videodata =  this.totaldata.videoslist as VIdData;

            const streamurll = this.videodata.streamurl;

            this.exerdata = this.totaldata.exerciselist as Array<object>;

            this.notedata = this.totaldata.noteslist as Array<object>;

            this.titledata = this.videodata.title as TitleData;
            this.videourl = streamurll;
            // this.exercise = this.exerdata.text;
            // this.answer = this.exerdata.options;
            this.videotitle = this.titledata.title;

            console.log(this.notedata);
            // this.exerdata
            this.exerdata.forEach( ex => {
              this.getex = ex as {test: string, options: string};
              this.putexe.push(this.getex );
              console.log(ex);
            });

            this.notedata.forEach( ex => {
              this.getnot = ex as {text: string };
              this.putnote.push(this.getnot );

            });

          }
        }

      });

    });






 }

 viewit() {
   this.viewanser = true;
 }



}
