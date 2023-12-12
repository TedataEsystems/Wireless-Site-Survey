import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { RequestHistoryComponent } from "../request-history/request-history.component";
import { RequestNoteComponent } from "../request-note/request-note.component";
import { RequestService } from "src/app/shared/service/request.service";
import { ActivatedRoute } from "@angular/router";
import { IRequestVm } from "src/app/shared/model/IRequestVm";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";

@Component({
  selector: "app-edit-request",
  templateUrl: "./edit-request.component.html",
  styleUrls: ["./edit-request.component.css"],
})
export class EditRequestComponent implements OnInit {
  useGroup : string;
  @ViewChild(MatSort) sort?:MatSort ;
  @ViewChild(MatPaginator) paginator?:MatPaginator ;
  id: number;
  requesModel: IRequestVm= <IRequestVm>{};
  displayedColumns: string[] = [
    "Attachment",
    "CreatedBy",
    "CreatedDate",
    "Download",
    "Delete",
  ];
  dataSourceAttachments = new MatTableDataSource();
  displayedColumns1: string[] = [
    "Note",
    "From",
    "To",
    "Attached File",
    "CreatedDate",
  ];
  dataSourceNotes = new MatTableDataSource();
  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private requestService: RequestService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
    console.log(this.id);
    this.getRequestById();
  }
  requestForm: FormGroup = new FormGroup({
    customerName: new FormControl("", [Validators.required]),
    branchName: new FormControl("", [Validators.required]),
    branchAddress: new FormControl("", [Validators.required]),
    lat: new FormControl(""),
    lang: new FormControl(""),
    comment: new FormControl(""),
    localContactName: new FormControl("", Validators.required),
    localContactEmail: new FormControl(""),
    localContactMobile1: new FormControl("", Validators.required),
    localContactMobile2: new FormControl(""),
    speedInternet: new FormControl(""),
    speedInternetType: new FormControl(""),
    speedVPN: new FormControl(""),
    speedVPNType: new FormControl(""),
    speedWifi: new FormControl(""),
    speedWifiType: new FormControl(""),
    priCount: new FormControl(""),
  });

  getRequestById() {
    this.requestService.getRequestById(this.id).subscribe((response) => {

      this.requesModel = response.data;

      this.dataSourceNotes = new MatTableDataSource<any>(this.requesModel.notes);
      this.dataSourceNotes.paginator = this.paginator as MatPaginator;
      this.dataSourceNotes.sort = this.sort as MatSort;
      
      this.dataSourceAttachments = new MatTableDataSource<any>(this.requesModel.attachmentList);
      this.dataSourceAttachments.paginator = this.paginator as MatPaginator;
      this.dataSourceAttachments.sort = this.sort as MatSort;

      this.setFormRequset();
    });
  }
  setFormRequset() {
    this.requestForm.patchValue({
      customerName: this.requesModel.customerName,
      branchName: this.requesModel.branchName,
      branchAddress: this.requesModel.branchAddress,
      lat: this.requesModel.lat,
      lang: this.requesModel.lang,
      comment: this.requesModel.comment,
      localContactName: this.requesModel.localContactName,
      localContactEmail: this.requesModel.localContactEmail,
      localContactMobile1: this.requesModel.localContactMobile1,
      localContactMobile2: this.requesModel.localContactMobile2,
      speedInternet: this.requesModel.speedInternet,
      speedInternetType:this.requesModel.speedInternetType,
      speedVPN: this.requesModel.speedVpn,
      speedVPNType: this.requesModel.speedVpnType,
      speedWifi: this.requesModel.speedWifi,
      speedWifiType: this.requesModel.speedWifiType,
      priCount: this.requesModel.priCount,
    });
  }
  getHistory(id: any) {
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = { id: id };
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = "50%";
    dialogGonfig.panelClass = "modals-dialog";
    this.dialog
      .open(RequestHistoryComponent, dialogGonfig)
      .afterClosed()
      .subscribe((result) => {});
  }

  addNotes(requesModel: any) {
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = { data : requesModel };
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = "50%";
    dialogGonfig.panelClass = "modals-dialog";
    this.dialog
      .open(RequestNoteComponent, dialogGonfig)
      .afterClosed()
      .subscribe((result) => {
        this.getRequestById();
      });
  }
}
