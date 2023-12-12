import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/shared/model/User';
import { vendor } from 'src/app/shared/model/Vendor';
import { statues } from 'src/app/shared/model/Status';
import { ReportService } from 'src/app/shared/service/report.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  vendoresList:vendor[];
  usersList:user[]=[];
  statusesList:statues[]=[];
  form:FormGroup=new FormGroup({
    requestBy:new FormControl(0),
    dateFrom:new FormControl(''),
    userId:new FormControl(0),
    statuesId:new FormControl(0),
    dateTo:new FormControl(''),
    vendorId:new FormControl(0),
  })
  constructor(public reportService:ReportService,private router:Router) { }

  ngOnInit(): void {

    this.reportService.getReportLists().subscribe((res) => {
      console.log(res,"result")
      if (res.status == true) {
        this.vendoresList=res.vendoresList;
        this.usersList=res.usersList;
        this.statusesList=res.statusesList;
      } 
    }); //end of subscribe
  }
  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    let report={
      
      dateFrom:this.form.value.dateFrom,
      dateTo:this.form.value.dateTo,
      userId:this.form.value.userId,
      vendorId:this.form.value.vendorId,
      statusId:this.form.value.statuesId,
      reportTypeId:this.form.value.requestBy
    }
    console.log("before")
    this.reportService.getReportResults(report).subscribe((res)=>{
      if(res.status=true)
      {
        this.router.navigate(['/home/reportResult'],{ state: { data: res.data } })
      }
      console.log(res.data,"result of search")
    })
    console.log(report,":Reporting values")
  }




}
