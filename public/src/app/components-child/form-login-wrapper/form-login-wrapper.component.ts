import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-login-wrapper',
  templateUrl: './form-login-wrapper.component.html',
  styleUrls: ['./form-login-wrapper.component.css']
})
export class FormLoginWrapperComponent implements OnInit {
  private actionLabel: string;
  private actionTitle: string;
  private action: string;
  constructor() {
  }

  ngOnInit() {
    this.initLogin();
  }
  changeAction() {
    if (this.action == 'Login') {
      this.initRegister();
    } else {
      this.initLogin();
    }
  }
  initLogin() {
    this.action = 'Login';
    this.actionTitle = 'New member?';
    this.actionLabel = 'Signup!';
  }
  initRegister() {
    this.action = 'Sign up';
    this.actionTitle = 'Already have an account?';
    this.actionLabel = 'Login';
  }
  loginFacebook() {
    let location = window.location.href;
    // window.location.href = `/oauth/facebook?redirect=${this.location}`;
    window.location.href = `http://localhost:8235/oauth/facebook?redirect=${location}`;
  }
  loginGoogle() {
    let location = window.location.href;
    window.location.href = `http://localhost:8235/oauth/google?redirect=${location}`;
  }
}
