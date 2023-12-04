import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Color, Label,MultiDataSet } from 'ng2-charts';
import { IGraphDataCount } from 'src/app/shared/model/IGraphDataCount';
import { DashboardService } from 'src/app/shared/service/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentMonthAndYear: string;
  graphDataCount = <IGraphDataCount>{};
  constructor(private title : Title ,private dashboardService : DashboardService) {
    this.title.setTitle("Dashboard")
   }

  ngOnInit(): void {
    this.GraphDataCount();
    this.getCurrentMonthAndYear();
  }
  getCurrentMonthAndYear(): void {
    const currentDate = new Date();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    this.currentMonthAndYear = `${month} ${year}`;
  }
  GraphDataCount(){
    this.dashboardService.GraphDataCount().subscribe((response)=>{
      debugger;
      console.log(response)
      this.graphDataCount =  response.data
    })
  }
  /////////////////donut chart//////////////////
  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartLabelsp: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartDatap: MultiDataSet = [
    [55, 25, 20]
  ];
  // doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  // doughnutChartData: MultiDataSet = [
  //   [55, 25, 20]
  // ];
  doughnutChartType: ChartType = 'doughnut';
  colors: Color[] = [
    {
      backgroundColor: [
       '#d7d7d7',
       '#f7f7f7',
        '#394b5b',
        '#9c1396',
        '#80868b',
      '#0f1323',
       '#1b3c51',
     '#791a75',
       '#8e2279'
      ]
    }
  ];

//////////line chart//////////////////////
lineChartData: ChartDataSets[] = [
  { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
];

lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

 lineChartOptions:ChartOptions = {
  responsive: true,
};

 lineChartColors: Color[] = [
  {
    borderColor: 'black',
    backgroundColor: 'rgba(255,255,0,0.28)',
  },
];

 lineChartLegend = true;
 lineChartPlugins = [];
 lineChartType:ChartType = 'line';



/////////bar chart/////////////////////////
barChartOptions: ChartOptions = {

  responsive: true,
};
barChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May'];
barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [];
// barcolors: Color[] = [
//   {
//     backgroundColor: [
//     'red',
//     'orange',
//     'grey'
//     ]
//   }
// ];

public barcolors: Array<any> = [
  { // first color
    backgroundColor: '#8e2279',

  },
  { // second color
    backgroundColor: '#80868b',

  },
{
  // thirdcolor
  backgroundColor: '#d7d7d7',

}];
public barChartData: ChartDataSets[] = [
  { data: [65, 59, 80, 81, 56, 55, 40], label: 'Evaluator' },
  { data: [28, 48, 40, 19, 86, 27, 90], label: 'Required' },
  { data: [11, 60, 20, 20, 80, 11, 70], label: 'Average' }
];




}



