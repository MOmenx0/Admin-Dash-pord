import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { AuthGuard } from './services/AuthGuard.service';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes =[
  
   {
    
    path: '',
    component: AdminLayoutComponent,
    canActivate:[AuthGuard],
    children: [{
      path: '',
      loadChildren: () => import('./layouts/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)},
  ],
    // canActivate: [AuthGuard]
  },
  { path: 'Login',component: LoginAdminComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  
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
export class AppRoutingModule { 

}
