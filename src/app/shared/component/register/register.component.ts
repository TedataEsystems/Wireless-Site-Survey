import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form:FormGroup
  warning=false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder:FormBuilder,
    private titleService: Title,


    @Inject(DOCUMENT) private document: Document
    )
    {

      this.titleService.setTitle("Register");



    }


  ngOnInit(): void {
    this.form = this._formBuilder.group({
      username: ['', Validators.required],
      Email:['', [Validators.required,Validators.email]],
      phone1:['', Validators.required],
      phone2:['', Validators.required],
      password:['', Validators.required],
      confirmPassword:['', Validators.required]

    },{validator: [this.checkIfMatchingPasswords('password', 'confirmPassword')]});


  }

  checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
        const passwordInput = group.controls[passwordKey];
        const passwordConfirmationInput = group.controls[passwordConfirmationKey];
        if (passwordInput.value !== passwordConfirmationInput.value) {
            return passwordConfirmationInput.setErrors({notEquivalent: true});
        } else {
            return passwordConfirmationInput.setErrors(null);
        }
    };
}
  onSubmit() {
      if (this.form.invalid) {
          return;
      }



        // window.location.href="/"


   this.router.navigate(['/template'], { relativeTo: this.route });
    }





}
