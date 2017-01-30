import { Component, OnInit } from '@angular/core';
import { overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { UserService } from '../../services/user.service'

import {FormLoginWrapperComponent} from '../../components-child/form-login-wrapper/form-login-wrapper.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private modal: Modal, private userService: UserService) { }

  ngOnInit() {
  }
  onLoginClick(){
    this.modal
    .open(FormLoginWrapperComponent, overlayConfigFactory({num1: 2, num2: 3, isBlocking: false}, BSModalContext))
         .then(dialog => this.userService.setLoginDialog(dialog));
  }
  // onCreateChallengeClick(){

  // }
}
