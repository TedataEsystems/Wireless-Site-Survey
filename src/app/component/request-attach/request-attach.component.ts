import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-attach',
  templateUrl: './request-attach.component.html',
  styleUrls: ['./request-attach.component.css']
})
export class RequestAttachComponent implements OnInit {

  fileAttr='choose file'
  fileVal: any;

  constructor( public dialogRef: MatDialogRef<RequestAttachComponent>,private toastr:ToastrService){
  }
  form: FormGroup = new FormGroup({
    filename: new FormControl(0),

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
