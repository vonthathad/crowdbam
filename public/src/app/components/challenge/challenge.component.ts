import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TypeService } from '../../services/type.service'
import { ChallengeService } from '../../services/challenge.service';

import { Challenge } from '../../classes/challenge';
import { Type } from '../../classes/type';
import {ActionService} from "../../services/action.service";
import {UserService} from "../../services/user.service";
import {User} from "../../classes/user";
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  private id: number;
  private type: string;
  private types: Type[];
  private isFollowing: boolean = false;
  private isFollow: boolean = false;
  private challenge: Challenge;
  private user: User;
  private userSub: Subscription;
  constructor(private uS: UserService, private cv: ChallengeService, private route: ActivatedRoute, private router: Router, private ts: TypeService,private aS: ActionService) {
    uS.loggedUserSource.subscribe(user => {
      this.user = user
    });
    this.userSub = new Subscription();
    route.params.subscribe(params => {
      cv.getChallenge(params['id']).subscribe((res: any) => {
        this.challenge = res.data;
        if(!this.user){
          this.userSub = uS.loggedUserSource.subscribe(user => {
            if(user){
              this.checkFollow(user,res.data);
            }
            this.userSub.unsubscribe();
          })
        } else {
          this.checkFollow(this.user,res.data);
        }


        this.cv.challengeSource.next(res.data);
        // console.log(this.challenge);
      });
    });


    ts.getTypes()
      .subscribe(res => {
        this.types = res['data']
        ts.typesSource.next(this.types)
      });
    // ts.currentTopic$.subscribe(type=>{
    //   this.type = type;
    // });
    route.params.subscribe(params => {
      this.id = params['id']
      this.type = params['type']
    });
  }

  ngOnInit() {
  }

  checkTimelines(timelines){
    timelines.forEach(function(){

    });
  }

  checkFollow(user,challenge){
    console.log('check',challenge);
    if(challenge.follows && challenge.follows.length){
      challenge.follows.forEach((follower)=>{
        if(follower == user._id){
          this.isFollow = true;
          return;
        };
      })
    }
    console.log(this.isFollow);
  }
  onShareFacebook(){
    if(this.user){
      this.aS.shareFacebook(window.location.href, this.id);
    }

  }
  onFollowChallenge(){
    if(this.user){

      this.aS.followChallenge(this.id,(isFollow)=>{
          this.isFollow = isFollow;
      });
    }

  }
}
