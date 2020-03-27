import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  FormBuilder, FormGroup, Validators  } from '@angular/forms';

import { AuthService } from '../auth.service';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {

  isSubmitted = false;
  adminForm: FormGroup;
  formRout;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.adminForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

  }

  ngOnInit(): void {
  }

  get formControls() {
    return this.adminForm.controls;
  }


  signIn() {
    this.isSubmitted = true;
    if (this.adminForm.invalid) {
      return;
    }
    this.authService.signInAdmin(this.adminForm.value);
    this.router.navigateByUrl('/admindashboard');

  }

}
