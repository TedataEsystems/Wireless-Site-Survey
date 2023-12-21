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
import { RequestService } from "../../service/request.service";
import { passwordValidator } from "./passwordValidator";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  warning = false;
  registerModel: Iregister = <Iregister>{};
  types: any[] = [];
  vendors: any[] = [];
  vendorFlag = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private titleService: Title,
    private registerService: RegisterService,
    private requestService: RequestService,
    public notificationService: NotificationMsgService,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.titleService.setTitle("Register");
  }

  ngOnInit(): void {
    this.initForm();
    this.GetUserTypes();
    this.GetVendors();
   
  }

  initForm(){
    this.form = this._formBuilder.group(
      {
        username: ["", Validators.required],
        Email: ["", [Validators.required, Validators.email]],
        phone: ["", Validators.required],
        typeId: ["", Validators.required],
        vendorId: [null],
        password: ['', [Validators.required, passwordValidator()]],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: [
          this.checkIfMatchingPasswords("password", "confirmPassword"),
        ],
      }
    );
  }
  GetUserTypes() {
    this.requestService.GetUserTypes().subscribe(response => {
      this.types = response;
      console.log(this.types);
    })
  }
  GetVendors() {
    this.requestService.GetVendors().subscribe(response => {
      this.vendors = response;
      console.log(this.vendors);
    })
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
    if (this.form.valid) {
      debugger
      this.registerModel.userName = this.form.value.username;
      this.registerModel.email = this.form.value.Email;
      this.registerModel.password = this.form.value.password;
      this.registerModel.PhoneNumber = this.form.value.phone1;
      this.registerModel.typeId = Number(this.form.value.typeId);
      this.registerModel.vendorId = Number(this.form.value.vendorId) === 0 ? null : Number(this.form.value.vendorId);
      this.registerService.Register(this.registerModel).subscribe(
        (res) => {
          this.notificationService.success(":: Saved Successfully");
          this.router.navigate(["/"], { relativeTo: this.route });

        },
        (error) => {
          console.log(error.error)
          this.notificationService.warn(":: An Error Occured");
        }
      );
    }
  }
//show vendor ddl if select type vendor
  OnChangeType(event) {
    if (event.value == '11') { this.vendorFlag = true; }
    else { this.vendorFlag = false }
    console.log(event)
  }
}
