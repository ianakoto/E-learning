import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homesidebar',
  templateUrl: './homesidebar.component.html',
  styleUrls: ['./homesidebar.component.css']
})
export class HomesidebarComponent implements OnInit {

  isExpanded = false;
  constructor() { }

  ngOnInit(): void {
  }

}
