
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AngularEditorConfig } from '@kolkov/angular-editor';


// export interface items{
//   label:string,
//   value:string
// }
@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {
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
      {
        name: 'table',
        class: 'table',
        tag: 'table class="table table-bordered"><tr><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td></tr></table>'
      }
    ],
    uploadUrl: 'v1/image',

    uploadWithCredentials: true,
    sanitize: true,
    toolbarPosition: 'top',
    // toolbarHiddenButtons: [
    //   ['bold', 'italic'],
    //   ['fontSize'],
    //   [
    //     'undo',
    //     'redo',
    //     'bold',
    //     'italic',
    //     'underline',
    //     'strikeThrough',
    //     'subscript',
    //     'superscript',
    //     'justifyLeft',
    //     'justifyCenter',
    //     'justifyRight',
    //     'justifyFull',
    //     'indent',
    //     'outdent',
    //     'insertUnorderedList',
    //     'insertOrderedList',
    //     'heading',
    //     'fontName'
    //   ],
    //   [
    //     'fontSize',
    //     'textColor',
    //     'backgroundColor',
    //     'customClasses',
    //     'link',
    //     'unlink',
    //     'insertImage',
    //     'insertVideo',
    //     'insertHorizontalRule',
    //     'removeFormat',
    //     'toggleEditorMode'
    //   ]
    // ]
}
  constructor(private toastr:ToastrService) {

  }
  ngOnInit(): void {

  }

}
