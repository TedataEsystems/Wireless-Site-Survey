import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Router } from "@angular/router";
import screenfull from "screenfull";
import { ChangePasswordComponent } from "src/app/component/change-password/change-password.component";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Output() public sidenavToggle = new EventEmitter();
  @Output() public triggerHeader = new EventEmitter();
  userName: string;

  constructor(private dialog: MatDialog,private router: Router) {}

  ngOnInit(): void {
    this.userName = localStorage.getItem("userName").toString();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
  setTitle(title) {
    this.triggerHeader.emit(title);
  }
  ChangePassword()
  {
    // let user={
    //   userName:localStorage.getItem("userName").toString()
    // }
    // const dialogGonfig = new MatDialogConfig();
    // dialogGonfig.data =user;
    // dialogGonfig.disableClose = true;
    // dialogGonfig.autoFocus = true;
    // dialogGonfig.width = '50%';
    // dialogGonfig.panelClass = 'modals-dialog';
    // this.dialog
    //   .open(ChangePasswordComponent, dialogGonfig)
    //   .afterClosed()
    //   .subscribe((result) => {
    //     this.ngOnInit();
    //   });
  }

  logOut() {
    localStorage.clear();
    // this.accountService.logout().subscribe(res=>{
    this.router.navigateByUrl("/");
  }
  toggleFullscreen() {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  }
}
