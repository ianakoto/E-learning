import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm;

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.registerForm = this.formBuilder.group({
      email: '',
      pwd: '',
      phone: '',
      class: '',
    });
   }

  ngOnInit(): void {
  }

}
