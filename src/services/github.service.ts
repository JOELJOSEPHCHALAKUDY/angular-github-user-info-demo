import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';



const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class GithubService {

  // api url is included here
  private apiUrl = environment.apiUrl;
  private clientId = environment.clientId;
  private clientSecret = environment.clientSecret;

  private currentUserSubject: BehaviorSubject<string>;
  public currentUser: Observable<string>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string>(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  public get currentUserValue(): String {
    return this.currentUserSubject.value;
  }


  getProfileInfo() {
    return this.http.get(this.apiUrl + `users/${this.currentUserSubject.value}?client_id="${this.clientId}"&client_secret="${this.clientSecret}`);
  }

  getRepos() {
    return this.http.get(this.apiUrl + `users/${this.currentUserSubject.value}/repos?client_id="${this.clientId}"&client_secret="${this.clientSecret}`);
  }

  getStarredRepos() {
    return this.http.get(this.apiUrl + `users/${this.currentUserSubject.value}/starred?client_id="${this.clientId}"&client_secret="${this.clientSecret}`);
  }

  getRepoInfo(owner, reponame) {
    return this.http.get(this.apiUrl + `repos/${owner}/${reponame}?state=all&client_id="${this.clientId}"&client_secret="${this.clientSecret}`);
  }

  getRepoPullInfo(owner, reponame) {
    return this.http.get(this.apiUrl + `repos/${owner}/${reponame}/pulls?state=all&client_id="${this.clientId}"&client_secret="${this.clientSecret}&page=1&per_page=10`);
  }

  // to get total count need to use search api instead of issues API
  getRepoIssuesInfo(owner, reponame) {
    return this.http.get(this.apiUrl + `search/issues?q=repo:${owner}/${reponame}&client_id="${this.clientId}"&client_secret="${this.clientSecret}`);
  }

  updateUser(username: string) {
    localStorage.setItem('currentUser', username);
    this.currentUserSubject.next(username);
  }

}