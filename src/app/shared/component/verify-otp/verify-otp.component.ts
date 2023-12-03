
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.css']
})
export class VerifyOTPComponent implements OnInit {

  warning=false;
  form:FormGroup=new FormGroup({
    OTP: new FormControl('',Validators.required)

  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    )
    {

      this.titleService.setTitle("Verify Code");



    }

  ngOnInit(): void {


  }

  onSubmit() {
      if (this.form.invalid) {
        this.warning=true
          return;

      }



   this.router.navigate(['/template'], { relativeTo: this.route });
    }




}
