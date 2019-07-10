import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GithubService } from 'src/services/github.service';

@Component({
  selector: 'app-repo-info',
  templateUrl: './repo-info.component.html',
  styleUrls: ['./repo-info.component.scss']
})
export class RepoInfoComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private _githubService: GithubService) { }

  repoInfo;
  pullList;
  repoIssues;
  currentUser;
  owner;
  reponame;
  showPull: boolean = false;
  intervalId;

  ngOnInit() {

    // get the settings to pull request from local storage
    let value = localStorage.getItem('prSettings');
    if(value){
      this.showPull = value === 'true' ? true : false;
    }

    // get the route id from activeRoute and load data
    this.activeRoute.params.subscribe(routeParams => {
      this.owner = routeParams.owner;
      this.reponame = routeParams.id;
      this.loadRepoInfo(routeParams.owner, routeParams.id);
      this.loadRepoIssues(routeParams.owner, routeParams.id);
      this.currentUser = this._githubService.currentUser;
      if(this.showPull){
        this.loadPullInfo(routeParams.owner, routeParams.id);
        this.intervalId = setInterval(() => {
          this.loadPullInfo(routeParams.owner, routeParams.id);
        }, 30000);
        
      }
    });

  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  loadRepoInfo(owner: String, reponame: String) {
    this._githubService.getRepoInfo(owner, reponame)
      .subscribe((data) => {
        this.repoInfo = data;
      },
        err => {
          console.log(err);
        });
  }


  loadPullInfo(owner: String, reponame: String) {
    this._githubService.getRepoPullInfo(owner, reponame)
      .subscribe((data) => {
        this.pullList = data;
      },
        err => {
          console.log(err);
        });
  }

  loadRepoIssues(owner: String, reponame: String) {
    this._githubService.getRepoIssuesInfo(owner, reponame)
      .subscribe((data) => {
        this.repoIssues = data;
      },
        err => {
          console.log(err);
        });
  }

  updateSetting(){
    localStorage.setItem('prSettings', `${this.showPull}`);
    if(this.showPull){
      this.loadPullInfo(this.owner, this.reponame);
      this.intervalId = setInterval(() => {
        this.loadPullInfo(this.owner, this.reponame);
      }, 30000);
    }
    else{
      clearInterval(this.intervalId);
    }
  }

}
