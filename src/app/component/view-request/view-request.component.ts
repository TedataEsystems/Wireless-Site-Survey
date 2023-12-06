import { Component, OnInit } from '@angular/core';
import { RequestNoteComponent } from '../request-note/request-note.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { RequestHistoryComponent } from '../request-history/request-history.component';

@Component({
  selector: 'app-view-request',
  templateUrl: './view-request.component.html',
  styleUrls: ['./view-request.component.css']
})
export class ViewRequestComponent implements OnInit {
  displayedColumns: string[] = ['Attachment','CreatedBy','CreatedDate','Download', 'Delete'];
  dataSource = new MatTableDataSource();
  displayedColumns1: string[] = ['Note','From','To','Attached File', 'CreatedDate'];
  dataSource1 = new MatTableDataSource();
  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  getHistory(id:any){

      const dialogGonfig = new MatDialogConfig();
      dialogGonfig.data = {id:id};
      dialogGonfig.disableClose = true;
      dialogGonfig.autoFocus = true;
      dialogGonfig.width = '50%';
      dialogGonfig.panelClass = 'modals-dialog';
      this.dialog
        .open(RequestHistoryComponent,dialogGonfig)
        .afterClosed()
        .subscribe((result) => {

        });


  }

  addNotes(id:any){

    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = {id:id};
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = '50%';
    dialogGonfig.panelClass = 'modals-dialog';
    this.dialog
      .open(RequestNoteComponent,dialogGonfig)
      .afterClosed()
      .subscribe((result) => {

      });


}
}
