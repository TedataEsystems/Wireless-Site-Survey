import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-request-history',
  templateUrl: './request-history.component.html',
  styleUrls: ['./request-history.component.css']
})
export class RequestHistoryComponent implements OnInit {

  displayedColumns1: string[] = ['HistoryMessage','Date','ByUser'];
  dataSource1 = new MatTableDataSource();
  constructor( public dialogRef: MatDialogRef<RequestHistoryComponent>,private toastr:ToastrService){
  }


    ngOnInit(){

    }






    onClose(){



      this.dialogRef.close('save');

    }

}
