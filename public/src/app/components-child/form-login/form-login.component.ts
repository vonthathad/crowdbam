import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';

import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent implements OnInit {
  private isSubmitting: boolean = false;
  private loginForm: FormGroup;
  private errorLogin: boolean;
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  loginLocal({ value, valid }: { value: User, valid: boolean }) {
    this.errorLogin = false;
    this.isSubmitting = true;
    if (valid) {
      let user: any = new Object();
      user.username = value.email;
      user.password = value.password;
      this.userService
        .login(user)
        .subscribe(data => this.succeed(data["user"]), error => this.fail(error));
    }
  }
  succeed(user: User) {
    this.isSubmitting = false;
    alert("Login successful");
    localStorage.setItem("token", user.token);
    // console.log("Login successful " + JSON.stringify(user));
    this.userService.loggedUserSource.next(user);
    this.userService.closeLoginDialog();
    // location.reload();
  }
  fail(e) {
    this.isSubmitting = false;
    this.errorLogin = true;
    console.error(e);
  }
  onForgotPasswordClick(){
    this.userService.closeLoginDialog();
  }
}
