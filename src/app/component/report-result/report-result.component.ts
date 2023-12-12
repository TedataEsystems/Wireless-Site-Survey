
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { RequestAttachComponent } from '../request-attach/request-attach.component';
@Component({
  selector: 'app-report-result',
  templateUrl: './report-result.component.html',
  styleUrls: ['./report-result.component.css']
})
export class ReportResultComponent implements OnInit {


  searchKey:string ='' ;
  constructor(private titleService:Title,private router:Router, private dialog: MatDialog,private dialogService: DeleteService, public toastr: ToastrService ) {
    this.titleService.setTitle("Pending Presales");
    this.data= this.router.getCurrentNavigation().extras.state.data;
    console.log(this.data,"Data1")
    //const data = router.getCurrentNavigation().extras.state.data;
   }

   @ViewChild(MatSort) sort?:MatSort ;
   @ViewChild(MatPaginator) paginator?:MatPaginator ;
   displayedColumns: string[] = ['ID','CustomerName','BranchName','L.CName', 'L.CMobile','AccountManager','Status','CreatedDate','CompletedDate'];
   dataSource = new MatTableDataSource();
   data:any;
  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(
      this.data
    );
    this.dataSource.paginator = this.paginator as MatPaginator;
    this.dataSource.sort = this.sort as MatSort;
    
  console.log(this.data,"Data")
  }


  ngAfterViewInit() {

    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;}

    onSearchClear(){
      this.searchKey ='';
      this.applyFilter();
    }
    applyFilter(){
      this.dataSource.filter=this.searchKey.trim().toLowerCase();
    }
    onCreate(){
      //this.service.initializeFormGroup();
      const dialogGonfig = new MatDialogConfig();
      dialogGonfig.disableClose=true;
      dialogGonfig.autoFocus= true;
      dialogGonfig.width="50%";
      dialogGonfig.panelClass='modals-dialog';

      //this._bottomSheet.open(UpdateSampleComponent);

    }
    onDelete(row:any){

      this.dialogService.openConfirmDialog().afterClosed().subscribe(res => {
        if (res) {
          // this.service.deleteDailyOperation(r.id).subscribe(
          //   rs => {
             this.toastr.success(':: successfully Deleted');
          //     this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
          //   },
          //   error => { this.toastr.error(':: An Error Occured') }
          // );
        }
      });

    }
    addAttach(id:any){

      const dialogGonfig = new MatDialogConfig();
      dialogGonfig.data = {id:id};
      dialogGonfig.disableClose = true;
      dialogGonfig.autoFocus = true;
      dialogGonfig.width = '50%';
      dialogGonfig.height = '400px';
      dialogGonfig.panelClass = 'modals-dialog';
      this.dialog
        .open(RequestAttachComponent,dialogGonfig)
        .afterClosed()
        .subscribe((result) => {

        });


  }
}
