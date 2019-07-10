import { RepoInfoComponent } from './repo-info/repo-info.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'user-info',
        component: ProfileComponent
      },
      {
        path: ':owner/:id',
        component: RepoInfoComponent
      },
      { 
        path: '', 
        redirectTo: 'user-info', 
        pathMatch: 'full' 
      },
    ]
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
