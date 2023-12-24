import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/shared/service/user.service';
import { Title } from '@angular/platform-browser';
import { LoadingService } from 'src/app/shared/service/loading.service';
@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

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
  to:new FormControl(''),
  subject:new FormControl(''),
  message:new FormControl('')
})
  constructor(private toastr:ToastrService,private userService:UserService , private title:Title,private loader:LoadingService) {
this.title.setTitle('Send Mail')
  }
  ngOnInit(): void {

  }
  onSubmit(){
    this.loader.busy();
   let mail={
    to:this.form.value.to,
    subject:this.form.value.subject,
    message:this.form.value.message
   }
   this.userService.sendMail(mail).subscribe((res)=> {
    if(res.status)
    {
      this.toastr.success(res.message);
   this.form.reset();
   this.loader.idle()
    }
    else{
      this.toastr.warning(res.message);
  this.form.reset();
  this.loader.idle()
    }
   })
  }

}
