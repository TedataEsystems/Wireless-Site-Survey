import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-note',
  templateUrl: './request-note.component.html',
  styleUrls: ['./request-note.component.css']
})
export class RequestNoteComponent implements OnInit {
  fileAttr='choose file'
  fileVal: any;

  constructor( public dialogRef: MatDialogRef<RequestNoteComponent>,private toastr:ToastrService){
  }
  form: FormGroup = new FormGroup({
    To: new FormControl(0),
    Note: new FormControl(''),
    file: new FormControl('')

  })

    ngOnInit(){
      this.form;
    }





    onSubmit(){
if(this.form.invalid){
  return;
}
    this.toastr.success(' Submitted successfully');
      this.onClose();
      this.dialogRef.close('save');

      }

    onClose(){

      this.form.reset();

      this.dialogRef.close('save');

    }
    uploadFileEvt(imgFile: any) {
      if (imgFile.target.files && imgFile.target.files[0]) {
        this.fileVal = imgFile.target.files[0];
        this.fileAttr = '';
        this.fileAttr=this.fileVal.name;

      } else {
        this.fileAttr = 'Choose File ...';
      }
    }

}
