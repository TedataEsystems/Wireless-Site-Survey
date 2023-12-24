import { Component, Inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { resetUserPass } from 'src/app/shared/model/User';
import { UserService } from 'src/app/shared/service/user.service';
import { LoadingService } from 'src/app/shared/service/loading.service';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  editorConfig: AngularEditorConfig = {
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '0',
      maxHeight: 'auto',
      width: 'auto',
      minWidth: '0',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: true,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],

      customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    uploadUrl: 'v1/image',

    uploadWithCredentials: false,
    sanitize: true,
    toolbarPosition: 'top',
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize']
    ]
}
form:FormGroup=new FormGroup({
  //oldPassword:new FormControl(''),
  newPassword:new FormControl(''),
  reTypeNewPassword:new FormControl(''),
})
  constructor(private toastr:ToastrService, private loader :LoadingService,private userService:UserService) {

  }
userPassword:resetUserPass;
  ngOnInit(): void {

  }
  onSubmit()
  {
    this.loader.busy();
    let username;
    let userPass={
      // userName:this.data.userName,
      userName:"string",
      oldPassword:this.form.value.oldPassword,
      newPassword:this.form.value.newPassword
    }



    if(this.userService.getRowData){
      username=this.userService.getRowData
      userPass.userName=username.userName
    }else{
      userPass.userName=localStorage.getItem("userName").toString()
    }

    if(this.form.value.newPassword == this.form.value.reTypeNewPassword)
    {
      this.userService.resetPassword(userPass).subscribe((res)=>{
        console.log(res,"result");
        if(res.status=="Success")
        {
          this.toastr.success("passwored reset successfully");
       this.form.reset();
       this.loader.idle();

        }
        else{
          this.toastr.warning(res.message);
      this.form.reset();
      this.loader.idle();
        }
      })
    }
    else
    {
      this.toastr.warning("The new password and confirmation password must match ");
      this.form.reset();
      this.loader.idle();
    }
  }
}
