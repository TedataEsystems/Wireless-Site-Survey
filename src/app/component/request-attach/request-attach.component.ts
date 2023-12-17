import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ToastrService } from "ngx-toastr";
import { INote } from "src/app/shared/model/INote";
import { IRequestVm } from "src/app/shared/model/IRequestVm";
import { RequestService } from "src/app/shared/service/request.service";

@Component({
  selector: "app-request-attach",
  templateUrl: "./request-attach.component.html",
  styleUrls: ["./request-attach.component.css"],
})
export class RequestAttachComponent implements OnInit {
  noteModel: INote = <INote>{};
  requestModel: IRequestVm = <IRequestVm>{};
  fileAttr = "choose file";
  fileVal: any;
  id:any;

  constructor(
    private requestService: RequestService,
    public dialogRef: MatDialogRef<RequestAttachComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    debugger
    this.id = data.id;
  }
  form: FormGroup = new FormGroup({
    filename: new FormControl(),
    file: new FormControl(""),
  });

  ngOnInit() {
    this.form;
  }

  onSubmit() {
    if (this.form.valid) {
      debugger
      console.log(this.file)
      this.requestService
        .upload(
          this.file,
          Number(this.id),
          0,
          this.fileAttr
        )
        .subscribe((res) => {
        if(res.status == true){
          this.toastr.success(" Submitted successfully");
        }else{
          this.toastr.error("Error !");
        }
        this.onClose();
        this.dialogRef.close("save");
        });
      return;
    }

  }

  onClose() {
    this.form.reset();

    this.dialogRef.close("save");
  }
  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.handleFileInputChange(imgFile);
      this.fileVal = imgFile.target.files[0];
      this.fileAttr = "";
      this.fileAttr = this.fileVal.name;
    } else {
      this.fileAttr = "Choose File ...";
    }
  }

  file: File | null; // Variable to store file
  fileName: string;
  handleFileInputChange(event) {
    this.file = event.target.files[0];
    this.fileName = event.target.files[0].name;
    var extensitin = this.fileName.split(".")[1];

    if (extensitin.toLowerCase() == "pdf") {
      this.form["controls"]["file"].setValue(this.fileName);
    } else {
      this.fileName = "";
      this.toastr.warning(
        "::Not Acceptable Extension only acceptable extenstion(jpeg,jpg,png,msg)"
      );
    }
  }
}
