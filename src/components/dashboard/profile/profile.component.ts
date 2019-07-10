import { Component, OnInit } from '@angular/core';
import { GithubService } from 'src/services/github.service';
import { AlertService } from 'src/components/shared/services/alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userData;
  repoList;
  currentUser;

  constructor(private _githubService: GithubService,private alertService: AlertService) { }

  ngOnInit() {
    this._githubService.currentUser.subscribe(currentUser => {
      if (currentUser && currentUser != null) {
        this.loadPageData();
        this.currentUser = currentUser;
      }
    })
  }

  loadPageData() {
    this._githubService.getStarredRepos()
      .subscribe((data) => {
        this.repoList = data;
      },
        err => {
          console.log(err);
          this.alertService.flash('User not found');
        });

    this._githubService.getProfileInfo()
      .subscribe((data) => {
        this.userData = data;
      },
        err => {
          console.log(err);
        });

  }

}
