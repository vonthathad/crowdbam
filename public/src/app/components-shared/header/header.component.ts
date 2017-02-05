import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UserService } from '../../services/user.service'

import { User } from '../../classes/user';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private user: User;
  private isSearching: boolean = false;
  private isExploringHide: boolean = false;
  private isExploringTrans: boolean = false;
  private isOpeningMenu: boolean = false;
  constructor(private us: UserService, private route: ActivatedRoute, private router: Router) {
    us.loggedUser$.subscribe(user => { this.renderUser(user, { from: "change" }) });
  }

  ngOnInit() {
    let token;
    this.route.queryParams.subscribe(queryParam => {
      token = queryParam['token'];
      // console.log("TOKEN " + token);
      // if there is one, take user in db and render to user
      if (token) {
        localStorage.setItem("token", token);
        this.us.getUser(token).subscribe((res: any) => this.renderUser(res.user, { from: "queryParam" }));
      }
    });

    // get token from localstorage if there is one
    token = localStorage.getItem("token");
    // console.log("TOKEN HERE" + token);
    if (token && token != "undefined") {
      this.us.getUser(token).subscribe((res: any) => this.renderUser(res.user, { from: "localStorage" }));
    }

  }
  onClickExplore(){
    this.isExploringHide = true;
    setTimeout(()=>{
      this.isExploringTrans = true;
    });
  }
  onCloseExplore(){
    this.isExploringTrans = false;
    this.isExploringHide = false;
  }
  onClickSearch(){
    this.isSearching = true;
    $('.js-search-term').focus();
  }
  onCloseSearch(){
    this.isSearching = false;
  }
  onToggleMenu(){
    this.isOpeningMenu = !this.isOpeningMenu;
  }
  renderUser(user, obj) {
    if (obj.from == "queryParam" || obj.from == "localStorage") {
      this.user = new User();
      // console.log("USER" + JSON.stringify(user));
      this.user._id = user._id;
      this.user.token = user.accessToken;
      this.user.displayName = user.displayName;
      this.user.avatar = user.avatar;
      console.log(this.user);
      // if (obj.from == "queryParam" || obj.from == "localStorage") {
      // this.us.loggedUserSource.next(this.user);
      // }
      this.us.loggedUserSource.next(this.user);
    } else {
      this.user = user;
    }
  }

  onLoginClick() {
    this.us.openLoginDialog();
  }
  onLogoutClick() {
    localStorage.removeItem("token");
    this.us.loggedUserSource.next(null);
    this.user = null;
    this.router.navigate(['']);
  }
  onCreateChallenge() {
    if (this.us.isLoggedIn()) {
      this.router.navigate(['/challenge-create']);
    } else {
      this.us.openLoginDialog();
    }
  }
}
