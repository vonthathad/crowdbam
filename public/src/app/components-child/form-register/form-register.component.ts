import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/user';

import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent implements OnInit {
  private registerForm: FormGroup;
  private errorEmail: string;
  constructor(private userService: UserService) { }

  ngOnInit() {

    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]),
      username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15), Validators.pattern('[A-Za-z0-9.]{1,}')]),
      password: new FormControl('', [Validators.required, Validators.minLength(5)])
    });

  }
  register({ value, valid }: { value: User, valid: boolean }) {
    console.log(value, valid);
    if (valid) {
      this.userService
        .register(value)
        .subscribe(data => this.succeed(data["user"]), error => this.fail(error._body), () => console.log("Complete"));
    }
  }
  succeed(user: User) {
    alert("Register successful");
    // update user
    this.userService.loggedUserSource.next(user);
    this.userService.closeLoginDialog();
  }
  fail(e) {
    this.errorEmail = (JSON.parse(e)).message;
    console.error("Error " + JSON.parse(e).message);
  }

}
