import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { ToastrService } from "ngx-toastr";
import { IRequestHistory } from "src/app/shared/model/IRequestHistory";
import { RequestService } from "src/app/shared/service/request.service";

@Component({
  selector: "app-request-history",
  templateUrl: "./request-history.component.html",
  styleUrls: ["./request-history.component.css"],
})
export class RequestHistoryComponent implements OnInit {
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  requestHistory: IRequestHistory[]=[];
  displayedColumns1: string[] = ["HistoryMessage", "Date", "ByUser"];
  dataSource1 = new MatTableDataSource();
  constructor(
    @Inject(MAT_DIALOG_DATA) public id: any,
    private requestService: RequestService,
    public dialogRef: MatDialogRef<RequestHistoryComponent>,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getRequestHistory();
  }

  getRequestHistory() {
    debugger
    this.requestService.getRequestHistory(Number(this.id.id)).subscribe((response) => {
      debugger
      this.requestHistory = response.data;
      this.dataSource1 = new MatTableDataSource<any>(this.requestHistory);
      this.dataSource1.paginator = this.paginator as MatPaginator;
      this.dataSource1.sort = this.sort as MatSort;
    });
  }

  onClose() {
    this.dialogRef.close("save");
  }
}
