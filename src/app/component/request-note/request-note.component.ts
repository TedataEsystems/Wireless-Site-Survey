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
  requestModel: IRequestVm = <IRequestVm>{};
  fileAttr = "choose file";
  fileVal: any;
  constructor(
    public dialogRef: MatDialogRef<RequestNoteComponent>,
    private requestService: RequestService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.requestModel = data.data;
    this.useGroup = localStorage.getItem("userGroup");
  }
  form: FormGroup = new FormGroup({
    To: new FormControl(),
    Note: new FormControl(""),
    file: new FormControl(""),
  });

  ngOnInit() {

  }

  onSubmit() {
    debugger;
    if (this.form.valid) {
      if(this.fileAttr !="choose file"){
        this.noteModel.attachedFile = this.fileAttr;
      }else{
        this.noteModel.attachedFile ="N/A"
      }
      this.noteModel.name = this.form.value.Note;
      this.noteModel.surveyId = this.requestModel.id;
      this.noteModel.toId = this.form.value.To;
      this.noteModel.fromId = this.requestModel.typeId;
      this.requestService.AddNote(this.noteModel).subscribe((response) => {
        if (response.status == true) {
    debugger;
    if(response.data.attachedFile !="N/A"){
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
    }
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
