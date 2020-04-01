import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterationService } from '../registeration.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private regService: RegisterationService,
    private router: Router,
  ) {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      pwd: ['', Validators.required],
      parent: ['', Validators.required],
      student: ['', Validators.required],
      phone: ['', Validators.required],
      class_no: ['', Validators.required],
    });
   }

  ngOnInit(): void {
  }


  get formControls() {
    return this.registerForm.controls;
  }

  registerMe() {
    this.isSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.regService.doRegister(this.registerForm.value, 'popupstyle');

  }

}
