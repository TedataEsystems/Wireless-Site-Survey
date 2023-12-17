import { Component, NgZone, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { AngularEditorConfig } from "@kolkov/angular-editor";
import { RequestHistoryComponent } from "../request-history/request-history.component";
import { RequestNoteComponent } from "../request-note/request-note.component";
import { RequestService } from "src/app/shared/service/request.service";
import { ActivatedRoute, Router } from "@angular/router";
import { IRequestVm } from "src/app/shared/model/IRequestVm";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { Toast, ToastrService } from "ngx-toastr";

@Component({
  selector: "app-edit-request",
  templateUrl: "./edit-request.component.html",
  styleUrls: ["./edit-request.component.css"],
})
export class EditRequestComponent implements OnInit {
  useGroup: string;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  id: number;
  requestModel: IRequestVm = <IRequestVm>{};
  displayedColumns: string[] = [
    "Attachment",
    "CreatedBy",
    "CreatedDate",
    "Download",
   // "Delete",
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
    private requestService: RequestService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.id = Number(this.route.snapshot.paramMap.get("id"));
  }

  ngOnInit(): void {
    this.getRequestById();
  }
  ngAfterViewInit() {
    this.dataSourceNotes.paginator = this.paginator as MatPaginator;
    this.dataSourceNotes.sort = this.sort as MatSort;
    this.dataSourceAttachments.paginator = this.paginator as MatPaginator;
    this.dataSourceAttachments.sort = this.sort as MatSort;
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
getNotesByRequestId(){
  this.requestService.getNotesByRequestId(this.id).subscribe(res=>{
    debugger
    this.requestModel.notes = res.notesList;
    this.requestModel.attachmentList = res.attachesList;
    this.dataSourceNotes = new MatTableDataSource<any>(
      this.requestModel.notes
    );
    this.dataSourceAttachments = new MatTableDataSource<any>(
      this.requestModel.attachmentList
    );
  })
}
  getRequestById() {
    this.requestService.getRequestById(this.id).subscribe((response) => {
      this.requestModel = response.data;
      this.getNotesByRequestId();
      this.setFormRequset();
    });
  }
  setFormRequset() {
    this.requestForm.patchValue({
      customerName: this.requestModel.customerName,
      branchName: this.requestModel.branchName,
      branchAddress: this.requestModel.branchAddress,
      lat: this.requestModel.lat,
      lang: this.requestModel.lang,
      comment: this.requestModel.comment,
      localContactName: this.requestModel.localContactName,
      localContactEmail: this.requestModel.localContactEmail,
      localContactMobile1: this.requestModel.localContactMobile1,
      localContactMobile2: this.requestModel.localContactMobile2,
      speedInternet: this.requestModel.speedInternet,
      speedInternetType: this.requestModel.speedInternetType,
      speedVPN: this.requestModel.speedVpn,
      speedVPNType: this.requestModel.speedVpnType,
      speedWifi: this.requestModel.speedWifi,
      speedWifiType: this.requestModel.speedWifiType,
      priCount: this.requestModel.priCount,
    });
  }
  getHistory() {
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = { id: this.id };
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = "50%";
    dialogGonfig.panelClass = "modals-dialog";
    this.dialog
      .open(RequestHistoryComponent, dialogGonfig)
      .afterClosed()
      .subscribe((result) => {});
  }

  addNotes(requestModel: any) {
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = { data: requestModel };
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
  DeleteAttach(id: any) {
    this.requestService.DeleteAttachFile(Number(id)).subscribe((response) => {
      this.getRequestById();
    });
  }
  DownloadAttach(id: any) {
    this.requestService.DownloadAttach(Number(id)).subscribe((response) => {
      const linkSource = "data:" + response.type + ";base64," + response.data;
      const downloadLink = document.createElement("a");
      const fileName = response.name;
      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    });
  }

  onSubmit() {
    debugger
    if (this.requestForm.valid) {
      this.requestModel.customerName = this.requestForm.value.customerName;
      this.requestModel.branchAddress = this.requestForm.value.branchAddress;
      this.requestModel.branchName = this.requestForm.value.branchName;
      this.requestModel.lang = this.requestForm.value.lang;
      this.requestModel.lat = this.requestForm.value.lat;
      this.requestModel.localContactEmail =
        this.requestForm.value.localContactEmail;
      this.requestModel.localContactName =
        this.requestForm.value.localContactName;
      this.requestModel.localContactMobile1 =
        this.requestForm.value.localContactMobile1;
      this.requestModel.localContactMobile2 =
        this.requestForm.value.localContactMobile2;
      this.requestModel.speedInternet = Number(
        this.requestForm.value.speedInternet
      );
      this.requestModel.speedInternetType =
        this.requestForm.value.speedInternetType;
      this.requestModel.speedVpn = Number(this.requestForm.value.speedVPN);
      this.requestModel.speedVpnType = this.requestForm.value.speedVPNType;
      this.requestModel.speedWifi = Number(this.requestForm.value.speedWifi);
      this.requestModel.speedWifiType = this.requestForm.value.speedWifiType;
      this.requestModel.priCount = this.requestForm.value.priCount;
      this.requestModel.comment = this.requestForm.value.comment;
      debugger
      console.log(this.requestModel)
      this.requestService
        .EditRequest(this.requestModel)
        .subscribe((response) => {
          console.log(response);
          this.toastr.success("Edit  Successfully");
          this.router.navigate(["/home"], { relativeTo: this.route });
        });
    }
  }
}
