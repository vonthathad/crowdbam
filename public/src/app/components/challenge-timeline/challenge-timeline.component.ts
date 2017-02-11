import { Component, OnInit } from '@angular/core';


import { Timeline } from '../../classes/timeline';
import { Challenge } from '../../classes/challenge';

import { ChallengeService } from '../../services/challenge.service';
@Component({
  selector: 'app-challenge-timeline',
  templateUrl: './challenge-timeline.component.html',
  styleUrls: ['./challenge-timeline.component.css']
})
export class ChallengeTimelineComponent implements OnInit {
  private timelines: Timeline[];
  private challenge: Challenge;

  constructor(private cv: ChallengeService) {
    cv.challange$.subscribe(challenge => {
      this.renderChallenge(challenge);
    });
  }

  ngOnInit() {
    if (this.cv.challenge) this.renderChallenge(this.cv.challenge);
  }
  renderChallenge(challenge: Challenge) {
    if (challenge) {
      let now = (new Date()).getTime();
      let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      let currentFilted = false;
      for (let i = 0; i < challenge.timelines.length; i++) {
        let date = new Date(parseInt(challenge.timelines[i].deadline));
        console.log(date.getTime() + ' $ ' + now);
        if (date.getTime() > now) {
          if (!currentFilted) {
            challenge.timelines[i].status = 'current';
            currentFilted = true;
          } else {
            challenge.timelines[i].status = 'notYet';
          }
        } else {
          challenge.timelines[i].status = 'passed';
        }
        challenge.timelines[i].deadline = date.toLocaleDateString('en-US', options);
      }
      this.challenge = challenge;
      console.log('timelines' + JSON.stringify(challenge));
      if (!this.challenge.timelines) this.challenge.timelines = new Array<Timeline>();
      // this.timelines = timelines;
      this.setSortTimeline();
    }
  }

  setSortTimeline() {
    this.timelines = this.challenge.timelines;
    this.timelines.sort((a, b) => {
      let timeStampA = new Date(a.deadline).getTime();
      let timeStampB = new Date(b.deadline).getTime();
      // console.log(timeStampA + ' / ' + timeStampB);
      if (timeStampA > timeStampB) return 1
      else if (timeStampA < timeStampB) return -1;
      return 0;
    });
  }

}
