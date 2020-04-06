import { Component, OnInit } from '@angular/core';
import { FirebaseserviceService } from 'src/app/firebaseservice.service';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { DocumentChangeAction, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Userhist } from 'src/app/userhist';
import { Histupload } from 'src/app/histupload';



// import { ILineChartOptions, IChartistAnimationOptions, IChartistData} from 'chartist';

// import { ChartEvent, ChartType } from 'ng-chartist';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['student_name', 'parent_name', 'phone_number'];
  dataSource;
  materialSource;

  materialdisplayColumns: string[] = ['type', 'lesson', 'time'];

  items: DocumentChangeAction<unknown>[];
  // docchange: DocumentChangeAction<>;
  Useritems$: QueryDocumentSnapshot<unknown>;

  model: Userhist;
  ELEMENT_DATA  = [];
  MATERIAL_ELEMENT_DATA  = [];
  matmodule: Histupload;
  subscriptCount;
  activeCount;

  constructor(private fireservice: FirebaseserviceService) { }


  ngOnInit() {

    this.getuserRecord();

    this.getuploadRecord();

    this.fireservice.getSubscriptionCount();
    this.fireservice.getActiveUsers();

    if (this.fireservice.subscriptionCount != null) {
      this.subscriptCount = this.fireservice.subscriptionCount;
    }

    if (this.fireservice.activeCount != null) {
      this.activeCount = this.fireservice.activeCount;
    }

  }


  getuploadRecord() {
    this
    .fireservice
    .getuploadHistory()
    .subscribe( data => {
        const itemsm = data ;
        itemsm.map( mdata => {
          this.matmodule = mdata.payload.doc.data() as Histupload;
          if ( this.matmodule.type != null) {
          this.MATERIAL_ELEMENT_DATA.push({
            type: this.matmodule.type,
            lesson: this.matmodule.lesson,
            time: this.matmodule.time,
           });

          }

        });

        this.MATERIAL_ELEMENT_DATA =  JSON.parse( JSON.stringify( this.MATERIAL_ELEMENT_DATA ) );
        this.materialSource = this.MATERIAL_ELEMENT_DATA;

        console.log(this.MATERIAL_ELEMENT_DATA);


    });

  }


  getuserRecord() {
    this
    .fireservice
    .getuserHistory()
    .subscribe( data => {
        this.items = data ;
        this.items.map( mdata => {
          this.Useritems$ = mdata.payload.doc;


          this.model = mdata.payload.doc.data() as Userhist;
          if ( this.model.email != null) {
          this.ELEMENT_DATA.push({
            student_name: this.model.studen_name,
            parent_name: this.model.parent_name,
            phone_number: this.model.phone,
           });

          }

        });

        this.ELEMENT_DATA =  JSON.parse( JSON.stringify( this.ELEMENT_DATA ) );
        this.dataSource = this.ELEMENT_DATA;

        console.log(this.ELEMENT_DATA  );
    });

  }




  // type: ChartType = 'Line';
  // data: IChartistData = {
  //   labels: [
  //     'Jan',
  //     'Feb',
  //     'Mar',
  //     'Apr',
  //     'May',
  //     'Jun',
  //     'Jul',
  //     'Aug',
  //     'Sep',
  //     'Oct',
  //     'Nov',
  //     'Dec'
  //   ],
  //   series: [
  //     [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
  //     [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
  //   ]
  // };

  // options: ILineChartOptions = {
  //   axisX: {
  //     showGrid: false
  //   },
  //   height: 300
  // };

  // events: ChartEvent = {
  //   draw: (data) => {
  //     if (data.type === 'line') {
  //       data.element.animate({
  //         y2: {
  //           dur: '0.5s',
  //           from: data.y1,
  //           to: data.y2,
  //           easing: 'easeOutQuad'
  //         } as IChartistAnimationOptions
  //       });
  //     }
  //   }
  // };


}
