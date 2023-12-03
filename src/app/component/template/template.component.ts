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
import { DeleteService } from 'src/app/shared/service/delete.service';
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
  constructor(private titleService:Title,private router:Router, private dialog: MatDialog,private dialogService: DeleteService, public toastr: ToastrService ) {
    this.titleService.setTitle("Pending Sales");
   }

   @ViewChild(MatSort) sort?:MatSort ;
   @ViewChild(MatPaginator) paginator?:MatPaginator ;
   displayedColumns: string[] = ['ID','CustomerName','BranchName','L.CName', 'L.CMobile','AccountManager','Status','CreatedDate', 'action'];
   dataSource = new MatTableDataSource();
  ngOnInit(): void {
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
