import { Component, OnInit } from '@angular/core';



import { ILineChartOptions, IChartistAnimationOptions, IChartistData} from 'chartist';

import { ChartEvent, ChartType } from 'ng-chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }


  type: ChartType = 'Line';
  data: IChartistData = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    series: [
      [5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
      [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
    ]
  };

  options: ILineChartOptions = {
    axisX: {
      showGrid: false
    },
    height: 300
  };

  events: ChartEvent = {
    draw: (data) => {
      if (data.type === 'line') {
        data.element.animate({
          y2: {
            dur: '0.5s',
            from: data.y1,
            to: data.y2,
            easing: 'easeOutQuad'
          } as IChartistAnimationOptions
        });
      }
    }
  };

  ngOnInit(): void {
  }

}
