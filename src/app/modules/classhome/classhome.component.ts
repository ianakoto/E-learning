import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

declare var require: any;
@Component({
  selector: 'app-classhome',
  templateUrl: './classhome.component.html',
  styleUrls: ['./classhome.component.css'],
})

export class ClasshomeComponent implements OnInit {

  imgname = require('src/assets/kidd2.jpg');
  constructor( public router: Router) { }

  ngOnInit(): void {
  }


  kg2() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
         class: 'KG 2'
      },
  };
    this.router.navigate(['classroom/subjects'], navigationExtras);
   }

  bs1() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
         class: 'BS Class 1'
      },
  };
    this.router.navigate(['classroom/subjects'], navigationExtras );
  }
  bs2() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
         class: 'BS Class 2'
      },
  };
    this.router.navigate(['classroom/subjects'], navigationExtras);
     }
  bs3() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
         class: 'BS Class 3'
      },
  };
    this.router.navigate(['classroom/subjects'], navigationExtras);
  }
  bs4() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
         class: 'BS Class 4'
      },
  };
    this.router.navigate(['classroom/subjects'], navigationExtras);
   }
}
