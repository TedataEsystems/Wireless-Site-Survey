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



export interface PeriodicElement {
  id: number;
  template: string;
  LastPublish:string;
  Schedule: string;
  Access: string;
  LastModified:string;

}

const ELEMENT_DATA: PeriodicElement[] = [
  {id:1,template: "temp1", LastPublish: '10 days', Schedule: "yes", Access: "All users",LastModified: '10 days'},
  {id:2,template: "temp2", LastPublish: '2 hours', Schedule: "NO", Access: "All users",LastModified: '10 days'},
  {id:3,template: "temp3", LastPublish: '4 hours', Schedule: "NO", Access: "All users",LastModified: '10 days'},
  {id:4,template: "temp4", LastPublish: '1 hours', Schedule: "yes", Access: "some users",LastModified: '10 days'},
  {id:5,template: "temp5", LastPublish: '10 days', Schedule: "yes", Access: "All users",LastModified: '10 days'},
  {id:6,template: "temp6", LastPublish: '10 days', Schedule: "yes", Access: "All users",LastModified: '10 days'},
  {id:7,template: "temp7", LastPublish: '10 days', Schedule: "NO", Access: "some users",LastModified: '10 days'},
  {id:8,template: "temp8", LastPublish: '10 days', Schedule: "NO", Access: "All users",LastModified: '10 days'},


];



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
  constructor(private titleService:Title,private router:Router, private dialog: MatDialog,private dialogService: DeleteService, public toastr: ToastrService, private _bottomSheet: MatBottomSheet ) {
    this.titleService.setTitle("Template");
   }

   @ViewChild(MatSort) sort?:MatSort ;
   @ViewChild(MatPaginator) paginator?:MatPaginator ;
   displayedColumns: string[] = ['Id','template','LastPublish','LastModified', 'Schedule','Access','Inspection', 'action'];
   dataSource = new MatTableDataSource(ELEMENT_DATA);
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


    onselectcheckall(e:Event){}


    selection = new SelectionModel<PeriodicElement>(true, []);

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
      if (this.isAllSelected()) {
        this.selection.clear();
        return;
      }

      this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PeriodicElement): string {
      if (!row) {
        return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

}
