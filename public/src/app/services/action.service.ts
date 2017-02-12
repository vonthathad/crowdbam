import { Injectable } from '@angular/core';
import { FacebookService, FacebookUiParams } from 'ng2-facebook-sdk';
import {Rest} from "./rest";
import {ChallengeService} from "./challenge.service";


@Injectable()
export class ActionService {

  constructor(private facebookService: FacebookService,private cS: ChallengeService) {
  }
  shareFacebook(url,id) {
    let shareParams: FacebookUiParams = {
      method: 'share',
      mobile_iframe: 'true',
      href: url
    };
    this.cS.actionChallenge(id,'share').subscribe();
    this.facebookService.ui(shareParams);
    // window.FB.init({
    //   appId: "1743828749275715",
    //   channelUrl: 'app/channel.html',
    //   status: true,
    //   xfbml: true
    // });
    // window.FB.ui({
    //   method: 'share',
    //   mobile_iframe: true,
    //   href: this.url + "?ref=share&rs_image="+this.pic+"&rs_title="+this.name+"&rs_des="+this.des
    // }, function(res){
    //   if (callback) callback();
    // });
  };
  followChallenge(id,callback){
    this.cS.actionChallenge(id,'follow').subscribe((res:any) => {
      console.log(res);
      callback(res.data.follow);
    });
  }
  publishChallenge(id,callback){
    this.cS.actionChallenge(id,'publish').subscribe((res:any) => {
      callback(res.data);
    });
  }
  submitReview(id){
    this.cS.actionChallenge(id,'review').subscribe(() => {
      alert('Submit succeed!');
    });
  }
  // get currentUser$() { return this.fc.currentUser$; }

}

export var ACTION_PROVIDER: Array<any> = [
  { provide: ActionService, useClass: ActionService }
]
