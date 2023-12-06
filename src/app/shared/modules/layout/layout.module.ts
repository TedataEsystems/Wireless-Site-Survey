import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from 'src/app/component/dashboard/dashboard.component';
import { HeaderComponent } from '../../component/header/header.component';
import { SubHeaderComponent } from '../../component/sub-header/sub-header.component';
import { FooterComponent } from '../../component/footer/footer.component';
import { SidebarComponent } from '../../component/sidebar/sidebar.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';
import { LayoutComponent } from '../../component/layout/layout.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DeleteMsgComponent } from '../../component/delete-msg/delete-msg.component';
import { ChartsModule } from 'ng2-charts';
import { LoaderComponent } from '../../component/loader/loader.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from '../../interceptors/loading.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TemplateFormComponent } from '../../../component/template-form/template-form.component';
import { TemplateComponent } from '../../../component/template/template.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { SendMailComponent } from '../../../component/send-mail/send-mail.component';
import { ChangePasswordComponent } from '../../../component/change-password/change-password.component';
import { RegisterComponent } from '../../component/register/register.component';
import { PendingPresalesComponent } from 'src/app/component/pending-presales/pending-presales.component';
import { PendingVendorComponent } from 'src/app/component/pending-vendor/pending-vendor.component';
import { CompletedComponent } from 'src/app/component/completed/completed.component';
import { VerifyOTPComponent } from '../../component/verify-otp/verify-otp.component';
import { EditRequestComponent } from 'src/app/component/edit-request/edit-request.component';
import { ViewRequestComponent } from 'src/app/component/view-request/view-request.component';
import { RequestHistoryComponent } from 'src/app/component/request-history/request-history.component';
import { RequestNoteComponent } from 'src/app/component/request-note/request-note.component';


@NgModule({
  declarations: [
    LayoutComponent,
    DashboardComponent,
    HeaderComponent,
    SubHeaderComponent,
    FooterComponent,
    SidebarComponent,
    DeleteMsgComponent,
    LoaderComponent,
    TemplateFormComponent,
    TemplateComponent,
    SendMailComponent,
    ChangePasswordComponent,
    RegisterComponent,
    PendingPresalesComponent,
    PendingVendorComponent,
    CompletedComponent,
    VerifyOTPComponent,
    EditRequestComponent,
    ViewRequestComponent,
    RequestHistoryComponent,
    RequestNoteComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ChartsModule,
    NgxSpinnerModule,
    AngularEditorModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),



  ],

  providers:[{provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor , multi:true}]
})
export class LayoutModule { }
