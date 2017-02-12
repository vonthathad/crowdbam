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
  private countdown: any;
  private thisStage: string;
  private nextStage: string;
  private interval: any;
  constructor(private uS: UserService, private cv: ChallengeService, private route: ActivatedRoute, private router: Router, private ts: TypeService,private aS: ActionService) {
    uS.loggedUserSource.subscribe(user => {
      this.user = user;
      console.log('nhan user');
    });
    this.userSub = new Subscription();
    route.params.subscribe(params => {

      cv.getChallenge(params['id']).subscribe((res: any) => {
        this.challenge = res.data;
        if(this.challenge.timelines) this.checkTimelines(this.challenge.timelines);
        if(!this.user){
          this.user = uS.user;
          this.checkFollow(this.user,res.data);
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
  intervalCountdown(){
    if(this.countdown){
      this.interval = setInterval(()=>{
        if(!this.countdown.seconds){
          this.countdown.seconds = 59;
          if(!this.countdown.minutes){
            this.countdown.minutes = 59;
            if(!this.countdown.hours){
              this.countdown.hours = 23;
              if(!this.countdown.days){
                clearInterval(this.interval);
              } else {
                this.countdown.days--;
              }
            } else {
              this.countdown.hours--;
            }
          } else {
            this.countdown.minutes--;
          }
        } else {
          this.countdown.seconds--;
        }
      },1000)
    }
  }
  checkTimelines(timelines){
    let check = true;
    timelines.forEach((timeline,index)=>{
      let date = parseInt(timeline.deadline);
      if (date > Date.now() && check) {
        console.log('vo deadline');
        check = false;
        if(timeline.title) this.thisStage = timeline.title;
        if(timelines[index + 1] && timelines[index + 1].title) {
          this.nextStage = timelines[index + 1].title;
          this.countdown = {};
          let datetime = new Date(date)
          this.countdown.hours = datetime.getHours();
          this.countdown.minutes = datetime.getMinutes();
          this.countdown.seconds = datetime.getSeconds();
          this.countdown.days = datetime.getDay();
          this.intervalCountdown();
        }
        return false;
      }
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
    } else {
      this.uS.openLoginDialog();
    }

  }
  onFollowChallenge(){
    if(this.user){

      this.aS.followChallenge(this.id,(isFollow)=>{
          this.isFollow = isFollow;
      });
    } else {
      this.uS.openLoginDialog();
    }

  }
}
