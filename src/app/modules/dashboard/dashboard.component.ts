import { Component, OnInit } from '@angular/core';




// import { ILineChartOptions, IChartistAnimationOptions, IChartistData} from 'chartist';

// import { ChartEvent, ChartType } from 'ng-chartist';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
];


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;




  constructor() { }


  ngOnInit() {
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
