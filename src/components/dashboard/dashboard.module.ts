import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-toggle-switch';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ProfileComponent } from './profile/profile.component';
import { RepoInfoComponent } from './repo-info/repo-info.component';

@NgModule({
  declarations: [
    DashboardComponent, 
    ProfileComponent, 
    RepoInfoComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,  // imported the shared module
    FormsModule,
    UiSwitchModule
  ]
})
export class DashboardModule { }
