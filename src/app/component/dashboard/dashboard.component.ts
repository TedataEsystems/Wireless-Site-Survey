import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { ChartOptions, ChartType, ChartDataSets } from "chart.js";
import { Color, Label, MultiDataSet } from "ng2-charts";
import { IGraphDataCount } from "src/app/shared/model/IGraphDataCount";
import { IGraphDataJson } from "src/app/shared/model/IGraphDataJson";
import { DashboardService } from "src/app/shared/service/dashboard.service";
import { LoadingService } from "src/app/shared/service/loading.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit ,AfterViewInit {
  currentMonthAndYear: string;
  graphDataJson = <IGraphDataJson>{};
  graphDataCount = <IGraphDataCount>{};
  constructor(
    private title: Title,
    private dashboardService: DashboardService,
    private loader :LoadingService
  ) {
    this.title.setTitle("Dashboard");
  }

  ngOnInit(): void {
    this.loader.busy();
    this.GraphDataCount();
    this.GraphDataJson();
    this.getCurrentMonthAndYear();
  }
  ngAfterViewInit(){
    this.loader.idle();
  }
  getCurrentMonthAndYear(): void {
    const currentDate = new Date();
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const month = monthNames[currentDate.getMonth()];
    const year = currentDate.getFullYear();

    this.currentMonthAndYear = `${month} ${year}`;
  }
  GraphDataCount() {
    this.dashboardService.GraphDataCount().subscribe((response) => {

      console.log(response);
      this.graphDataCount = response.data;
    });
  }
  GraphDataJson() {
    this.dashboardService.GraphDataJson().subscribe((response) => {

      console.log(response);
      this.graphDataJson = response.data;
      console.log(this.graphDataJson);
    });
  }
  /////////////////donut chart//////////////////
  doughnutChartLabels: Label[] = ["Open", "Closed"];
  doughnutChartData: MultiDataSet = [[this.graphDataJson.createdRequestsThisMonth, this.graphDataJson.completedRequestsThisMonth, 20]];
  doughnutChartLabelsp: Label[] = ["Open", "Closed"];
  doughnutChartDatap: MultiDataSet = [[this.graphDataJson.dailyGraphCreatedData?.length+1, this.graphDataJson.dailyGraphCompletedData?.length+1]];

  doughnutChartType: ChartType = "doughnut";
  colors: Color[] = [
    {
      backgroundColor: [
        "#c5d52b",
        "#c75d7b",
        "#394b5b",
        "#9c1396",
        "#80868b",
        "#0f1323",
        "#1b3c51",
        "#791a75",
        "#8e2279",
      ],
    },
  ];

  //////////line chart//////////////////////
  lineChartData: ChartDataSets[] = [
    {
      data: [
        this.graphDataCount.dailyGraphCreatedData,
        this.graphDataCount.dailyGraphCompletedData,
      ],
      label: "Open & Closed Requests Chart ",
    },
  ];

  lineChartLabels: Label[] = ["Open", "Closed"];

  lineChartOptions: ChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: "black",
      backgroundColor: "rgba(255,255,0,0.28)",
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType: ChartType = "line";

  /////////bar chart/////////////////////////
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ["Jan", "Feb", "Mar", "Apr", "May"];
  barChartType: ChartType = "bar";
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
    {
      // first color
      backgroundColor: "#8e2279",
    },
    {
      // second color
      backgroundColor: "#80868b",
    },
    {
      // thirdcolor
      backgroundColor: "#d7d7d7",
    },
  ];
  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Evaluator" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Required" },
    { data: [11, 60, 20, 20, 80, 11, 70], label: "Average" },
  ];
}
