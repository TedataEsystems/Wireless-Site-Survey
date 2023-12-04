import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { TemplateFormComponent } from './component/template-form/template-form.component';
import { TemplateComponent } from './component/template/template.component';
import { LayoutComponent } from './shared/component/layout/layout.component';
import { LoginComponent } from './shared/component/login/login.component';
import { SendMailComponent } from './component/send-mail/send-mail.component';
import { ChangePasswordComponent } from './component/change-password/change-password.component';
import { RegisterComponent } from './shared/component/register/register.component';
import { PendingPresalesComponent } from './component/pending-presales/pending-presales.component';
import { PendingVendorComponent } from './component/pending-vendor/pending-vendor.component';
import { CompletedComponent } from './component/completed/completed.component';
import { VerifyOTPComponent } from './shared/component/verify-otp/verify-otp.component';

const routes: Routes = [
  {
    path:'login',
  component:LoginComponent,
 },
 {
  path:'register',
 component:RegisterComponent,
},
{
  path:'verifyOTP',
component:VerifyOTPComponent,
},
  {
    path:'',
    component: LayoutComponent,


    children: [
      {
      path:'',
      component: DashboardComponent,

    },

    {
      path:'template',
      component:TemplateComponent
    },


    {
      path:'pendingPresales',
      component:PendingPresalesComponent,
     
    },

    {
      path:'pendingVendor',
      component:PendingVendorComponent
    },

    {
      path:'completed',
      component:CompletedComponent
    },

    {
      path:'newRequest',
      component:TemplateFormComponent
    },
    {
      path:'sendMail',
      component:SendMailComponent
    },
    {
      path:'changePassword',
      component:ChangePasswordComponent
    },


    ]
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }