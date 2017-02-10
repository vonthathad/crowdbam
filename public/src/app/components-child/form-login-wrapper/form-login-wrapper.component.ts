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
  private location: string;
  constructor() {
  }

  ngOnInit() {
    this.location = window.location.href;
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
    console.log('login facebook');
    // window.location.href = `/oauth/facebook?redirect=${this.location}`;
    if (this.location.indexOf('localhost') > -1) {
      console.log('local');
      window.location.href = 'http://localhost:8456/oauth/facebook?redirect=' + this.location;
    } else {
      window.location.href = '/oauth/facebook?redirect=' + this.location;
    }

  }
  loginGoogle() {
    let location = window.location.href;
    if (location.indexOf('localhost') > -1) {
      location = `localhost:8456/oauth/google?redirect=${location}`;
    } else {
      location = `/oauth/google?redirect=${location}`;
    }
  }
}
