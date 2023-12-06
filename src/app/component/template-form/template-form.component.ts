import { Component, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { RequestService } from "src/app/shared/service/request.service";
import { IRequest } from "src/app/shared/model/IReuest";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

// export interface items{
//   label:string,
//   value:string
// }
@Component({
  selector: "app-template-form",
  templateUrl: "./template-form.component.html",
  styleUrls: ["./template-form.component.css"],
})
export class TemplateFormComponent implements OnInit {
  requestModel: IRequest = <IRequest>{};
  dateFinished: string;
  dateSendToVendor: string;
  userId: number;
  vendorId: number;
  statusId: number;
  requestForm: FormGroup = new FormGroup({
    customerName: new FormControl("", [Validators.required]),
    branchName: new FormControl("", [Validators.required]),
    branchAddress: new FormControl("", [Validators.required]),
    lat: new FormControl(""),
    lang: new FormControl(""),
    comment: new FormControl(""),
    localContactName: new FormControl("", Validators.required),
    localContactEmail: new FormControl(""),
    localContactMobile1: new FormControl("", Validators.required),
    localContactMobile2: new FormControl(""),
    speedInternet: new FormControl(""),
    speedInternetType: new FormControl(""),
    speedVPN: new FormControl(""),
    speedVPNType: new FormControl(""),
    speedWifi: new FormControl(""),
    speedWifiType: new FormControl(""),
    priCount: new FormControl(""),
  });
  constructor(private toastr:ToastrService, private requestService:RequestService) {


}
  ngOnInit(): void {}
  onSubmit() {
    debugger;
    if (this.requestForm.valid) {
      this.requestModel.customerName = this.requestForm.value.customerName;
      this.requestModel.branchAddress = this.requestForm.value.branchAddress;
      this.requestModel.branchName = this.requestForm.value.branchName;
      this.requestModel.lang = this.requestForm.value.lang;
      this.requestModel.lat = this.requestForm.value.lat;
      this.requestModel.localContactEmail =this.requestForm.value.localContactEmail;
      this.requestModel.localContactName =this.requestForm.value.localContactName;
      this.requestModel.localContactMobile1 =this.requestForm.value.localContactMobile1;
      this.requestModel.localContactMobile2 =this.requestForm.value.localContactMobile2;
      this.requestModel.speedInternet = Number(this.requestForm.value.speedInternet);
      this.requestModel.speedInternetType = this.requestForm.value.speedInternetType;
      this.requestModel.speedVPN = Number(this.requestForm.value.speedVPN);
      this.requestModel.speedVPNType = this.requestForm.value.speedVPNType;
      this.requestModel.speedWifi = Number(this.requestForm.value.speedWifi);
      this.requestModel.speedWifiType = this.requestForm.value.speedWifiType;
      this.requestModel.priCount = this.requestForm.value.priCount;
      this.requestModel.comment = this.requestForm.value.comment;
      console.log(this.requestModel);
      this.requestService.AddReuest(this.requestModel).subscribe((response) => {
        console.log(response);
      });
    }
  }
}
