import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';




@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  dynamicForm: FormGroup;
  submitted = false;


  subno = 0;
  topno = 0;
  notno = 0;


  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({
      subjects: new FormArray([]),
      topics: new FormArray([]),
      notes: new FormArray([]),
      class_no: ['', Validators.required]
  });


  }



  addsubject() {

    return this.subno += 1;
  }

  addtopic() {

    return this.topno += 1;
  }

  addnote() {

    return this.notno += 1;
  }


  removenote() {
    if (this.notno <= 0) {
      return this.notno = 0;
    }

    return this.notno -= 1;
  }


  removesubject() {
    if (this.subno <= 0) {
      return this.subno = 0;
    }

    return this.subno -= 1;
  }


  removetopic() {
    if (this.topno <= 0) {
      return this.topno = 0;
    }
    return this.topno -= 1;
  }


    // convenience getters for easy access to form fields
    get f() { return this.dynamicForm.controls; }

    get s() { return this.f.subjects as FormArray; }
    get t() { return this.f.topics as FormArray; }
    get n() { return this.f.notes as FormArray; }
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

  onChangeNotes() {
    const numberOfnotes = this.notno;
    if (this.n.length < numberOfnotes) {
        for (let i = this.n.length; i < numberOfnotes; i++) {
            this.n.push(this.formBuilder.group({
                url: ['', Validators.required],
                title: ['', Validators.required]
            }));
        }
    } else {
        for (let i = this.n.length; i >= numberOfnotes; i--) {
            this.n.removeAt(i);
        }
    }
  }


onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.dynamicForm.invalid ) {
      return;
  }

  // display form values on success
  alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
}


onReset() {
  // reset whole form back to initial state
  this.submitted = false;
  this.dynamicForm.reset();
  this.s.clear();
  this.t.clear();
  this.n.clear();
  this.subno = 0;
  this.topno = 0;
  this.notno = 0;
}

onClear() {
  // clear errors and reset ticket fields
  this.submitted = false;
  this.s.clear();
  this.t.clear();
  this.n.clear();
  this.subno = 0;
  this.topno = 0;
  this.notno = 0;
}




}
