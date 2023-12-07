
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DeleteService } from 'src/app/shared/service/delete.service';


@Component({
  selector: 'app-users-view',
  templateUrl: './users-view.component.html',
  styleUrls: ['./users-view.component.css']
})
export class UsersViewComponent implements OnInit {
  searchKey:string ='' ;
   @ViewChild(MatSort) sort?:MatSort ;
   @ViewChild(MatPaginator) paginator?:MatPaginator ;
   displayedColumns: string[] = ['Username','Group','Vendor', 'action'];
   dataSource = new MatTableDataSource();
   constructor(private titleService:Title,private router:Router, private dialog: MatDialog,private dialogService: DeleteService, public toastr: ToastrService) {
    this.titleService.setTitle("User /View");
   }

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
    onDelete(id:any){

    }

    resetPassword(id:any){
      
    }
}
