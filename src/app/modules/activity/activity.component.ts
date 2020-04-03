import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FirebaseserviceService } from 'src/app/firebaseservice.service';
import { Activitymodule } from 'src/app/activitymodule';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  items$: Observable<any>;
  module: Activitymodule ;
  snakechange = new FormControl();
  linechange = new FormControl();
  threeschange = new FormControl();

  constructor(private fireservice: FirebaseserviceService) { }

  linegame = false;
  threesgame = false;
  snakegame = false;

  ngOnInit(): void {


    this.items$.subscribe( data => {

        this.module = data.data as unknown as Activitymodule;
        console.log(this.module);
        this.linegame = this.module.snake;
        this.threesgame = this.module.line;
        this.snakegame = this.module.threes;
     });


  }


  previewLineGame() {
    if (!this.linegame ) {
      this.linegame = true;
      this.threesgame = false;
      this.snakegame = false;
    }
  }

  previewSnakeGame() {
    if (!this.snakegame ) {
      this.snakegame = true;
      this.linegame = false;
      this.threesgame = false;
    }
  }


  // tslint:disable-next-line:adjacent-overload-signatures
  previewThreesGame() {
    if (!this.threesgame ) {
      this.threesgame = true;
      this.linegame = false;
      this.snakegame = false;
    }
  }

  uploadThreesGameActivity() {
    this.fireservice.threesActivity(this.threeschange.value);


  }

  uploadSnakeGameActivity() {
    this.fireservice.snakeActivity(this.snakechange.value);

  }



  uploadLineGameActivity() {
    this.fireservice.lineActivity(this.linechange.valid);

  }

}
