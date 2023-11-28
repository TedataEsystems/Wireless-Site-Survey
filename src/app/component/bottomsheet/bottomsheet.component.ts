import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-bottomsheet',
  templateUrl: './bottomsheet.component.html',
  styleUrls: ['./bottomsheet.component.css']
})
export class BottomsheetComponent implements OnInit {
  selectedValue="Name is";
  selectedtrigger="Require Action"
  constructor(private _bottomSheetRef: MatBottomSheetRef<BottomsheetComponent>) { }

  ngOnInit(): void {
  }
  onClose(){


  this._bottomSheetRef.dismiss();


 }

}
