import { Component, Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { INote } from "src/app/shared/model/INote";
import { IRequestVm } from "src/app/shared/model/IRequestVm";
import { RequestService } from "src/app/shared/service/request.service";

@Component({
  selector: "app-request-note",
  templateUrl: "./request-note.component.html",
  styleUrls: ["./request-note.component.css"],
})
export class RequestNoteComponent implements OnInit {
  noteModel: INote = <INote>{};
  useGroup: string;
  requesModel: IRequestVm = <IRequestVm>{};
  fileAttr = "choose file";
  fileVal: any;
  constructor(
    public dialogRef: MatDialogRef<RequestNoteComponent>,
    private requestService: RequestService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.requesModel = data.data;
    this.useGroup = localStorage.getItem("userGroup");
  }
  form: FormGroup = new FormGroup({
    To: new FormControl(0),
    Note: new FormControl(""),
    file: new FormControl(""),
  });

  ngOnInit() {
    debugger;
    console.log(this.data);
    console.log(this.requesModel);
    this.form;
  }

  onSubmit() {
    debugger;
    if (this.form.valid) {
      this.noteModel.name = this.form.value.Note;
      this.noteModel.attachedFile = this.fileAttr;
      this.noteModel.surveyId = this.requesModel.id;
      this.noteModel.toId = this.requesModel.typeId;
      this.noteModel.fromId = this.requesModel.typeId;
      this.requestService.AddNote(this.noteModel).subscribe((response) => {
        if (response.status == true) {
          this.requestService
            .upload(
              this.file,
              Number(this.noteModel.surveyId),
              Number(this.noteModel.toId),
              this.noteModel.attachedFile
            )
            .subscribe((res) => {
              console.log(res);
            });
          this.toastr.success("Add note successfully");
          this.onClose();
          this.dialogRef.close("save");
        } else {
          this.toastr.warning("Faild !!!");
        }
      });
    } else {
      return;
    }
  }

  onClose() {
    this.form.reset();

    this.dialogRef.close("save");
  }
  uploadFileEvt(imgFile: any) {
    debugger;
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
