import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {User} from "../../classes/user";

@Component({
  selector: 'app-profile-navigator',
  templateUrl: './profile-navigator.component.html',
  styleUrls: ['./profile-navigator.component.css']
})
export class ProfileNavigatorComponent implements OnInit {
  @Input() current: string;
  @Input() private selectedUser: User;
  @Input() private isMine: boolean;
  // @Output() currentEmit = new EventEmitter();
  constructor(private router: Router) {
    this.current = '';

  }

  ngOnInit() {


  }
  onTabClick(type) {
    this.current = type;
    this.router.navigate([`/profiles/${this.selectedUser._id}/${type}`])
    // this.currentEmit.emit(this.current);
  }
}
