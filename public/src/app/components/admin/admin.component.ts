import { Component, OnInit } from '@angular/core';

import { UserService } from '../../services/user.service';
import { ChallengeService } from '../../services/challenge.service';

import { User } from '../../classes/user';
import { Challenge } from '../../classes/challenge';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private user: User;
  private challenges: Challenge[];
  constructor(private cs: ChallengeService, private us: UserService) {
    us.loggedUserSource.subscribe(user => this.getChallenges(user));
  }

  ngOnInit() {
    if(this.us.user) this.getChallenges(this.us.user);
  }
  getChallenges(user){
    if(user.role == 'admin' || user.role == 'manager'){
      this.cs.getChallenges({review:true}).subscribe((res:any)=>{
        console.log(res.data);
        this.renderChallenges(res.data);
      })
    } else {
      location.href = '/';
    }
  }
  renderChallenges(challenges){
    this.challenges = challenges;
  }
}
