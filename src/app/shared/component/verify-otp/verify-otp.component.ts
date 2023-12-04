import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { OtpService } from "../../service/otp.service";
import { Iotp } from "../../model/opt";
import { NotificationMsgService } from "../../service/notification-msg.service";

@Component({
  selector: "app-verify-otp",
  templateUrl: "./verify-otp.component.html",
  styleUrls: ["./verify-otp.component.css"],
})
export class VerifyOTPComponent implements OnInit {
  otpModel = <Iotp>{};
  warning = false;
  form: FormGroup = new FormGroup({
    OTP: new FormControl("", Validators.required),
  });

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private otpService: OtpService,
    public notificationService: NotificationMsgService
  ) {
    this.titleService.setTitle("Verify Code");
  }

  ngOnInit(): void {}

  onSubmit() {
      this.otpModel.email = localStorage.getItem("email").toString();
      this.otpModel.otp = this.form.value.OTP;
      this.otpService
        .OtpVerificationRequest(this.otpModel)
        .subscribe((response) => {
          debugger
          console.log(response);
          if(response.status == true){
            this.notificationService.success(response.message);
            this.router.navigate(["/home"], { relativeTo: this.route });
          }else{
            this.notificationService.warn(response.message);
          }
        });
   
  }
}
