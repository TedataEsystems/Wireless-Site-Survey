
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteService } from 'src/app/shared/service/delete.service';
import { UserService } from 'src/app/shared/service/user.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';


@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {
  searchKey: string = '';
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  displayedColumns: string[] = ['Id', 'Username', 'Group', 'Vendor', 'action'];
  dataSource = new MatTableDataSource();
  constructor(private deleteService: DeleteService, private userService: UserService, private titleService: Title, private router: Router, private dialog: MatDialog, private dialogService: DeleteService, public toastr: ToastrService) {
    this.titleService.setTitle("User /View");
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(res => {
      console.log(res.usersList, "users")
      if (res.status == true) {
        this.dataSource = new MatTableDataSource<any>(
          res.usersList
        );
        this.dataSource.paginator = this.paginator as MatPaginator;
        this.dataSource.sort = this.sort as MatSort;
      }
    });

  }
  ngAfterViewInit() {

    this.dataSource.sort = this.sort as MatSort;
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.dataSource.filter = this.searchKey.trim().toLowerCase();
  }
  onDelete(id: any) {
    console.log(id)
    this.deleteService
      .openConfirmDialog()
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.userService.deleteUser(id).subscribe(
            (res) => {
              this.toastr.success('Deleted Successfully');
              this.ngOnInit();
            },
            (error) => {
              this.toastr.warning('failed ');
            }
          );
        }
      });
  }

  resetPassword(row: any) {
    console.log(row, "row from reset method")
    const dialogGonfig = new MatDialogConfig();
    dialogGonfig.data = row;
    dialogGonfig.disableClose = true;
    dialogGonfig.autoFocus = true;
    dialogGonfig.width = '50%';
    dialogGonfig.panelClass = 'modals-dialog';
    this.dialog
      .open(ChangePasswordComponent, dialogGonfig)
      .afterClosed()
      .subscribe((result) => {
        this.ngOnInit();
      });
  }
}
