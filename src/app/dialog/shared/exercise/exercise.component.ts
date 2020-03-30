import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {

  public Editor = ClassicEditor;


  dynamicForm: FormGroup;
  submitted = false;


  subno = 0;
  topno = 0;
  exeno = 0;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.dynamicForm = this.formBuilder.group({
      subjects: new FormArray([]),
      topics: new FormArray([]),
      exercises: new FormArray([]),
      class_no: ['', Validators.required]
  });

  }


  addsubject() {

    return this.subno += 1;
  }

  addtopic() {

    return this.topno += 1;
  }

  addexer() {

    return this.exeno += 1;
  }


  removeexer() {
    if (this.exeno <= 0) {
      return this.exeno = 0;
    }

    return this.exeno -= 1;
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
    get e() { return this.f.exercises as FormArray; }
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

  onChangeExercises() {
    const numberOfexercises = this.exeno;
    if (this.e.length < numberOfexercises) {
        for (let i = this.e.length; i < numberOfexercises; i++) {
            this.e.push(this.formBuilder.group({
                test: ['', Validators.required],
                options: ['', Validators.required],
                answer: ['', Validators.required],
            }));
        }
    } else {
        for (let i = this.e.length; i >= numberOfexercises; i--) {
            this.e.removeAt(i);
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
  this.e.clear();
  this.subno = 0;
  this.topno = 0;
  this.exeno = 0;
}

onClear() {
  // clear errors and reset ticket fields
  this.submitted = false;
  this.s.clear();
  this.t.clear();
  this.e.clear();
  this.subno = 0;
  this.topno = 0;
  this.exeno = 0;
}



public onReady( editor ) {
  editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
  );
}


}
