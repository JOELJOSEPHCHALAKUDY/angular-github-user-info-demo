import { GithubService } from './../../services/github.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  username;

  constructor(private _githubService : GithubService,private router: Router) { }

  ngOnInit() {
    this.username = this._githubService.currentUserValue;
  }

  searchUser(){
     if(this.username){
       this.router.navigateByUrl('user-info');
       this._githubService.updateUser(this.username);
     }
  }




}
