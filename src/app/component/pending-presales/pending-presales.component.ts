import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { SelectionModel } from "@angular/cdk/collections";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IRequestVm } from "src/app/shared/model/IRequestVm";
import { DeleteService } from "src/app/shared/service/delete.service";
import { RequestService } from "src/app/shared/service/request.service";

@Component({
  selector: "app-pending-presales",
  templateUrl: "./pending-presales.component.html",
  styleUrls: ["./pending-presales.component.css"],
})
export class PendingPresalesComponent implements OnInit {
  pendingPresalesReuests: IRequestVm[] = [];
  searchKey: string = "";
  constructor(
    private requestService: RequestService,
    private titleService: Title,
    private router: Router,
    private dialog: MatDialog,
    private dialogService: DeleteService,
    public toastr: ToastrService
  ) {
    this.titleService.setTitle("Pending Presales");
  }

  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  displayedColumns: string[] = [
    "ID",
    "CustomerName",
    "BranchName",
    "L.CName",
    "L.CMobile",
    "AccountManager",
    "Status",
    "Vendor",
    "CreatedDate",
    "action",
  ];
  dataSource = new MatTableDataSource();
  ngOnInit(): void {
    this.getRequestsPendingPresales();
  }

  getRequestsPendingPresales() {
    this.requestService.getRequestsPendingPresales().subscribe((response) => {
      debugger;
      this.pendingPresalesReuests = response.data;
      this.dataSource = new MatTableDataSource<any>(
        this.pendingPresalesReuests
      );
      this.dataSource.paginator = this.paginator as MatPaginator;
      this.dataSource.sort = this.sort as MatSort;
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  onCreate() {
    //this.service.initializeFormGroup();
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = "50%";
    dialogGonfig.panelClass = "modals-dialog";

    //this._bottomSheet.open(UpdateSampleComponent);
  }
  onDelete(row: any) {
    this.dialogService
      .openConfirmDialog()
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          // this.service.deleteDailyOperation(r.id).subscribe(
          //   rs => {
          this.toastr.success(":: successfully Deleted");
          //     this.getRequestdata(1, 25, '', this.sortColumnDef, this.SortDirDef);
          //   },
          //   error => { this.toastr.error(':: An Error Occured') }
          // );
        }
      });
  }
}
