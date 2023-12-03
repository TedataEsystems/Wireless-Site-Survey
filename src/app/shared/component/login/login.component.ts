import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '../../model/login';
import { LoginService } from '../../service/login.service';
import { Iuser } from '../../model/Iuser';
import { NotificationMsgService } from '../../service/notification-msg.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  warning=false;
  form:FormGroup=new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)

  });
  user = <Iuser>{};
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private LoginService : LoginService,
    public notificationService: NotificationMsgService,
    @Inject(DOCUMENT) private document: Document
    )
    {

      this.titleService.setTitle("App | Login");



    }

  ngOnInit(): void {


  }

  onSubmit() {
      if (this.form.invalid) {
          return;
      }

      let loginModel: Login =
      {
        userName: this.form.controls.username.value.trim(),
        password: this.form.controls.password.value,
      }
      this.LoginService.Login(loginModel).subscribe(res => {
        debugger
        console.log(res);
        this.user = res;
        if (this.user.token != "undefined" || this.user.token != null ||  this.user.status != false) {
          localStorage.setItem('token', this.user.token);
          localStorage.setItem('userName', this.user.userName);
          localStorage.setItem('userGroup', this.user.userGroup);
          this.router.navigateByUrl('home');
        }
        if (this.user.token == "undefined" || this.user.userName == "undefined" || this.user.token == null) {
          this.notificationService.warn('Invalid UserName or Password');
  
        }
        else if (this.user.status == false) {
          this.notificationService.warn('Invalid UserName or Password')
        }
  
      }
        , error => { this.notificationService.warn('Invalid UserName or Password') }
      );
   this.router.navigate(['/template'], { relativeTo: this.route });
    }





}
