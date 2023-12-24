import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IRequestVm } from 'src/app/shared/model/IRequestVm';
import { IRequest } from 'src/app/shared/model/IReuest';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { LoadingService } from 'src/app/shared/service/loading.service';
import { RequestService } from 'src/app/shared/service/request.service';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TemplateComponent implements OnInit {
  searchKey:string ='' ;
  pendingSalesReuests: IRequestVm[] = [];
  constructor(private titleService:Title,private router:Router,private loader :LoadingService, private dialog: MatDialog,private dialogService: DeleteService, public toastr: ToastrService ,private requestService : RequestService ) {
    this.titleService.setTitle("Pending Sales");
   }

   @ViewChild(MatSort) sort?:MatSort ;
   @ViewChild(MatPaginator) paginator?:MatPaginator ;
   displayedColumns: string[] = ['ID','CustomerName','BranchName','L.CName', 'L.CMobile','AccountManager','Status','CreatedDate', 'action'];
   dataSource = new MatTableDataSource();
  ngOnInit(): void {
    this.getRequestsPendingSales();
  }

  getRequestsPendingSales(){
    this.loader.busy();
  this.requestService.getRequestsPendingSales().subscribe(response => {
    this.pendingSalesReuests = response.data;
    this.dataSource = new MatTableDataSource<any>(this.pendingSalesReuests);
    this.dataSource.paginator = this.paginator as MatPaginator;
    this.dataSource.sort = this.sort as MatSort;
    this.loader.idle()
  })
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



}
