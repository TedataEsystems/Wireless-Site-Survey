import { DOCUMENT } from "@angular/common";
import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Iregister } from "../../model/register";
import { RegisterService } from "../../service/register.service";
import { NotificationMsgService } from "../../service/notification-msg.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  warning = false;
  registerModel: Iregister = <Iregister>{};

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private titleService: Title,
    private registerService: RegisterService,
    public notificationService: NotificationMsgService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.titleService.setTitle("Register");
  }

  ngOnInit(): void {
    this.form = this._formBuilder.group(
      {
        username: ["", Validators.required],
        Email: ["", [Validators.required, Validators.email]],
        phone1: ["", Validators.required],
        phone2: ["", Validators.required],
        password: ["", Validators.required],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: [
          this.checkIfMatchingPasswords("password", "confirmPassword"),
        ],
      }
    );
  }

  checkIfMatchingPasswords(
    passwordKey: string,
    passwordConfirmationKey: string
  ) {
    return (group: FormGroup) => {
      const passwordInput = group.controls[passwordKey];
      const passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value !== passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({ notEquivalent: true });
      } else {
        return passwordConfirmationInput.setErrors(null);
      }
    };
  }
  onSubmit() {
    debugger
    if (!this.form.invalid) {
      this.registerModel.userName = this.form.value.username;
      this.registerModel.email = this.form.value.Email;
      this.registerModel.password = this.form.value.password;
      this.registerModel.PhoneNumber = this.form.value.phone1;
      this.registerService.Register(this.registerModel).subscribe(
        (res) => {
          this.notificationService.success(":: Saved Successfully");
      this.router.navigate(["/login"], { relativeTo: this.route });

        },
        (error) => {
          this.notificationService.warn(":: An Error Occured");
        }
      );
    }
  }
}
