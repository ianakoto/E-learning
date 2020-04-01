import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';


import { FirebaseserviceService } from 'src/app/firebaseservice.service';
import { Videomodule } from 'src/app/videomodule';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  // topic and subject number
  subno = 0;
  topno = 0;
  vidno = 0;
  lessno = 0;

  hides = true;
  hidet = true;
  hidev = true;

  uploadPercent: Observable<number>;

  dynamicForm: FormGroup;
  submitted = false;

  module: Videomodule;

  selectedFiles: FileList;

  constructor(private formBuilder: FormBuilder, private fireservice: FirebaseserviceService) { }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      subjects: new FormArray([]),
      topics: new FormArray([]),
      lessons: new FormArray([]),
      videos: new FormArray([]),
      class_no: ['', Validators.required]
  });



  }

  detectFiles(event) {
    this.selectedFiles = event.target.files;
  }


  addsubject() {
    if (this.subno > 0) {
      this.hides = false;
    }

    return this.subno += 1;
  }

  addtopic() {
    if (this.topno > 0) {
      this.hidet = false;
    }

    return this.topno += 1;
  }

  addvideo() {
    if (this.vidno > 0) {
      this.hidev = false;
    }
    return this.vidno += 1;
  }

  addless() {
    return this.lessno += 1;
  }

  removevideo() {
    if (this.vidno <= 0) {
      this.hidev = true;
      return this.vidno = 0;
    }

    return this.vidno -= 1;
  }


  removesubject() {
    if (this.subno <= 0) {
      this.hides = true;
      return this.subno = 0;
    }

    return this.subno -= 1;
  }


  removetopic() {
    if (this.topno <= 0) {
      this.hidet = true;
      return this.topno = 0;
    }
    return this.topno -= 1;
  }


  removelesson() {
    if (this.lessno <= 0) {
      return this.lessno = 0;
    }
    return this.lessno -= 1;
  }


    // convenience getters for easy access to form fields
    get f() { return this.dynamicForm.controls; }

    get s() { return this.f.subjects as FormArray; }
    get t() { return this.f.topics as FormArray; }
    get l() { return this.f.lessons as FormArray; }
    get v() { return this.f.videos as FormArray; }
    get c() {return this.f; }

    onChangeSubjects() {
      const numberOfSubjects = this.subno;
      if (this.s.length < numberOfSubjects) {
          for (let i = this.s.length; i < numberOfSubjects; i++) {
              this.s.push(this.formBuilder.group({
                  name: ['', Validators.required],
              }));
          }
      } else {
          for (let i = this.s.length; i >= numberOfSubjects; i--) {
              this.s.removeAt(i);
          }
      }
  }


  onChangeTopics() {
    const numberOfTickets = this.topno;
    if (this.t.length < numberOfTickets) {
        for (let i = this.t.length; i < numberOfTickets; i++) {
            this.t.push(this.formBuilder.group({
                name: ['', Validators.required],
            }));
        }
    } else {
        for (let i = this.t.length; i >= numberOfTickets; i--) {
            this.t.removeAt(i);
        }
    }
}

  onChangeVideos() {
    const numberOfVideos = this.vidno;
    if (this.v.length < numberOfVideos) {
        for (let i = this.v.length; i < numberOfVideos; i++) {
            this.v.push(this.formBuilder.group({
                url: ['', Validators.required],
                title: ['', Validators.required]
            }));
        }
    } else {
        for (let i = this.v.length; i >= numberOfVideos; i--) {
            this.v.removeAt(i);
        }
    }
  }


  onChangeLessons() {
    const numberOfTickets = this.lessno;
    if (this.l.length < numberOfTickets) {
        for (let i = this.l.length; i < numberOfTickets; i++) {
            this.l.push(this.formBuilder.group({
                name: ['', Validators.required],
            }));
        }
    } else {
        for (let i = this.l.length; i >= numberOfTickets; i--) {
            this.l.removeAt(i);
        }
    }
  }


onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.dynamicForm.invalid ) {
      return;
  }

  this.module = this.dynamicForm.value;


  // upload to database

  this.fireservice.uploadStorage(this.module, this.selectedFiles);
  this.uploadPercent = this.fireservice.uploadPercent;
  // display form values on success
  // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
}


onReset() {
  // reset whole form back to initial state
  this.submitted = false;
  this.dynamicForm.reset();
  this.s.clear();
  this.t.clear();
  this.l.clear();
  this.lessno = 0;
  this.v.clear();
  this.subno = 0;
  this.topno = 0;
  this.vidno = 0;
}

onClear() {
  // clear errors and reset ticket fields
  this.submitted = false;
  this.s.clear();
  this.t.clear();
  this.l.clear();
  this.lessno = 0;
  this.v.clear();
  this.subno = 0;
  this.topno = 0;
  this.vidno = 0;
}










}
