import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {MatDialogModule} from '@angular/material/dialog';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppComponent } from './app.component';
import {MatGridList, MatGridListModule} from '@angular/material/grid-list';
import {MatDatepicker} from '@angular/material/datepicker';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './profil/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './Document/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AbsenceCreateComponent } from './absence-create/absence-create.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LoginComponent } from './login/login.component';
import {MatTabsModule} from '@angular/material/tabs';
import {AuthInterceptor} from './controller/service/auth-interceptor.service';
import {MatMenu, MatMenuModule} from '@angular/material/menu';
import { UserCreateComponent } from './user-create/user-create.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { AccountComponent } from './account/account.component';
import { DocComponent } from './doc/doc.component';
import { EditProfilComponent } from './edit-profil/edit-profil.component';
import { RegisterComponent } from './register/register.component';
import {UploadFilesComponent} from './upload-files/upload-files.component';



@NgModule({
    imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        ComponentsModule,
        RouterModule,
        AppRoutingModule,
        MatDialogModule,
        MatCheckboxModule,
        MatOptionModule,
        MatRadioModule,
        MatSelectModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatPaginatorModule,
        MatTabsModule,
        MatMenuModule,
        NgxPaginationModule,
        MatTableModule,
        MatDatepickerModule,
       MatToolbarModule,
        MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
     MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        MatNativeDateModule,
    MatButtonModule
    ],
    exports: [
       MatToolbarModule,
       MatGridListModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
       MatNativeDateModule,
        MatButtonModule,
    ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AbsenceCreateComponent,
    ConfirmDialogComponent,
    LoginComponent,
    UserCreateComponent,
    AccountComponent,
    DocComponent,
    EditProfilComponent,
    RegisterComponent,
      UploadFilesComponent


  ],

    providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent],
    entryComponents: [AbsenceCreateComponent , ConfirmDialogComponent, UserCreateComponent,DocComponent,RegisterComponent]
})
export class AppModule { }
