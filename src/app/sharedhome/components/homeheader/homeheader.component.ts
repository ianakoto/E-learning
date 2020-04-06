import { Component, OnInit } from '@angular/core';
import { FirebaseserviceService } from 'src/app/firebaseservice.service';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-homeheader',
  templateUrl: './homeheader.component.html',
  styleUrls: ['./homeheader.component.css']
})
export class HomeheaderComponent implements OnInit {

  constructor(private authService: AuthService, private fireService: FirebaseserviceService) { }

  ngOnInit(): void {
  }


  goutout() {
      this.fireService.updateActiveUsers();
      this.authService.logout();
  }
}
