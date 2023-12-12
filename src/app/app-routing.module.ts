import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./component/dashboard/dashboard.component";
import { TemplateFormComponent } from "./component/template-form/template-form.component";
import { TemplateComponent } from "./component/template/template.component";
import { LayoutComponent } from "./shared/component/layout/layout.component";
import { LoginComponent } from "./shared/component/login/login.component";
import { SendMailComponent } from "./component/send-mail/send-mail.component";
import { ChangePasswordComponent } from "./component/change-password/change-password.component";
import { RegisterComponent } from "./shared/component/register/register.component";
import { PendingPresalesComponent } from "./component/pending-presales/pending-presales.component";
import { PendingVendorComponent } from "./component/pending-vendor/pending-vendor.component";
import { CompletedComponent } from "./component/completed/completed.component";
import { VerifyOTPComponent } from "./shared/component/verify-otp/verify-otp.component";
import { EditRequestComponent } from "./component/edit-request/edit-request.component";
import { ViewRequestComponent } from "./component/view-request/view-request.component";
import { ReportComponent } from "./component/report/report.component";
import { UsersAddComponent } from "./component/users-add/users-add.component";
import { UsersViewComponent } from "./component/users-view/users-view.component";
import { ReportResultComponent } from "./component/report-result/report-result.component";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "verifyOTP",
    component: VerifyOTPComponent,
  },
  {
    path: "home",
    component: LayoutComponent,

    children: [
      {
        path: "",
        component: DashboardComponent,
      },

      {
        path: "template",
        component: TemplateComponent,
      },

      {
        path: "pendingPresales",
        component: PendingPresalesComponent,
      },

      {
        path: "pendingVendor",
        component: PendingVendorComponent,
      },

      {
        path: "completed",
        component: CompletedComponent,
      },
      {
        path: "Report",
        component: ReportComponent,
      },
      {
        path: "userAdd",
        component: UsersAddComponent,
      },
      {
        path: "userView",
        component: UsersViewComponent,
      },

      {
        path: "newRequest",
        component: TemplateFormComponent,
      },
      {
        path: "pendingVendor/editRequest/:id",
        component: EditRequestComponent,
      },
      {
        path: "template/editRequest/:id",
        component: EditRequestComponent,
      },
      {
        path: "completed/editRequest/:id",
        component: EditRequestComponent,
      },
      {
        path: "pendingPresales/editRequest/:id",
        component: EditRequestComponent,
      },
      {
        path: "viewRequest",
        component: ViewRequestComponent,
      },
      {
        path: 'reportResult',
        component: ReportResultComponent,
      },

      {
        path: "sendMail",
        component: SendMailComponent,
      },
      {
        path: "changePassword",
        component: ChangePasswordComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
