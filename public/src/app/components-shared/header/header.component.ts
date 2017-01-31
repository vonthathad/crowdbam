import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { UserService } from '../../services/user.service'

import { User } from '../../classes/user';

import { FormLoginWrapperComponent } from '../../components-child/form-login-wrapper/form-login-wrapper.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private user: User;
  constructor(private modal: Modal, private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {

    let token;
    this.route.queryParams.subscribe(queryParam => {
      token = queryParam['token'];
      console.log("TOKEN " + token);
      // if there is one, take user in db and render to user
      if (token) {
        console.log("1234");
        localStorage.setItem("token", token);
        this.userService.getUser(token).subscribe((res: any) => this.renderUser(res.user, { from: "queryParam" }));
      }
    });

    // get token from localstorage if there is one
    token = localStorage.getItem("token");
    console.log("TOKEN HERE" + token);
    if (token && token != "undefined") {
      this.userService.getUser(token).subscribe((res: any) => this.renderUser(res.user, { from: "localStorage" }));
    }

  }

  renderUser(user, obj) {
    if (obj.from == "queryParam" || obj.from == "localStorage") {
      this.user = new User();
      console.log("USER" + JSON.stringify(user));
      this.user._id = user._id;
      this.user.token = user.accessToken;
      this.user.displayName = user.displayName;
      this.user.avatar = user.avatar;
      // if (obj.from == "queryParam" || obj.from == "localStorage") {
      // this.userService.loggedUserSource.next(this.user);
      // }
      this.userService.loggedUserSource.next(this.user);
    } else {
      this.user = user;
    }
  }

  onLoginClick() {
    this.modal
      .open(FormLoginWrapperComponent, overlayConfigFactory({ num1: 2, num2: 3, isBlocking: false }, BSModalContext))
      .then(dialog => this.userService.setLoginDialog(dialog));
  }
    onLogoutClick() {
    // this.userService.logout(this.user.token).subscribe(() => {
    localStorage.removeItem("token");
    this.userService.loggedUserSource.next(null);
    this.user = null;
    // delete this.user;
    // location.reload();
    // });
  }
}
