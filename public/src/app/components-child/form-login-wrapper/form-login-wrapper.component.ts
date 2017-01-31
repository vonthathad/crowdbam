import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-login-wrapper',
  templateUrl: './form-login-wrapper.component.html',
  styleUrls: ['./form-login-wrapper.component.css']
})
export class FormLoginWrapperComponent implements OnInit {
  private actionLabel: string;
  private action: string;
  constructor() {
  }

  ngOnInit() {
    this.initLogin();
  }
  changeAction() {
    if (this.action == 'login') {
      this.initRegister();
    } else {
      this.initLogin();
    }
  }
  initLogin() {
    this.action = 'login';
    this.actionLabel = 'NEW USER?';
  }
  initRegister() {
    this.action = 'register';
    this.actionLabel = 'ALREADY HAVE AN ACCOUNT!';
  }
  loginFacebook() {
    let location = window.location.href;
    // window.location.href = `/oauth/facebook?redirect=${this.location}`;
    window.location.href = `http://localhost:8235/oauth/facebook?redirect=${location}`;
  }
  loginTwitter() {
    let location = window.location.href;
    window.location.href = `/oauth/twitter?redirect=${location}`;
  }
}
