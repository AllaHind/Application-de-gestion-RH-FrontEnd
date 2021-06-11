import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {IconsComponent} from './icons/icons.component';
import {TableListComponent} from './table-list/table-list.component';
import {TypographyComponent} from './Document/typography.component';
import {UserProfileComponent} from './profil/user-profile.component';
import {AccountComponent} from './account/account.component';
import {RegisterComponent} from './register/register.component';


export  const components=[LoginComponent,DashboardComponent,AdminLayoutComponent,RegisterComponent]
const routes: Routes = [
    {path:'login', component: components[0]},
  {path:'', component: components[0]},
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule',

    }]
  },
  {path:'register', component: components[3]},
];



@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
