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
}
