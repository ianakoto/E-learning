import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  allow;
  adminForm;
  formRout;
  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
  ) {
    this.adminForm = this.formBuilder.group({
      email: '',
      password: ''
    }),
    this.allow = false;
    this.formRout = router.data;

  }

  ngOnInit(): void {
  }


  onSubmit(customerData) {
    // Process and compare password hear
    console.warn('Your order has been submitted', customerData);
    if (customerData('email') === 'iancecilakoto@gmail.com') {
      this.allow = true;
    }
    this.adminForm.reset();


  }

}
