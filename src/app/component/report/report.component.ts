import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/shared/model/User';
import { vendor } from 'src/app/shared/model/Vendor';
import { statues } from 'src/app/shared/model/Status';
import { ReportService } from 'src/app/shared/service/report.service';
import { FormControl, FormGroup } from '@angular/forms';

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
  constructor(public reportService:ReportService) { }

  ngOnInit(): void {
    
    this.reportService.getReportLists().subscribe((res) => {
      console.log(res,"result")
      if (res.status == true) {
        this.vendoresList=res.vendoresList;
        this.usersList=res.usersList;
        this.statusesList=res.statusesList;
      } else {

        
      }
    }); //end of subscribe
  }
  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    let report={
      requestBy:this.form.value.requestBy,
      DataFrom:this.form.value.dateFrom,
      userId:this.form.value.userId,
      statusId:this.form.value.statuesId,
      dateTo:this.form.value.dateTo,
      vendorId:this.form.value.vendorId
    }
    console.log(report,":Reporting values")
  }

}
