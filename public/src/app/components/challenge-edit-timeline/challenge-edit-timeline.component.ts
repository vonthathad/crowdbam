import { Component, OnInit } from '@angular/core';


import { Timeline } from '../../classes/timeline';
import { Challenge } from '../../classes/challenge';

import { ChallengeService } from '../../services/challenge.service';

import { OrderByPipe } from '../../pipes/orderBy.pipe';
@Component({
  selector: 'app-challenge-edit-timeline',
  templateUrl: './challenge-edit-timeline.component.html',
  styleUrls: ['./challenge-edit-timeline.component.css']
})
export class ChallengeEditTimelineComponent implements OnInit {
  private timelines: Timeline[];
  private challenge: Challenge;
  constructor(private cv: ChallengeService) {
    cv.challange$.subscribe(challenge => {
      this.renderChallenge(challenge)
    });
  }

  ngOnInit() {
    if (this.cv.challenge) this.renderChallenge(this.cv.challenge);
  }
  renderChallenge(challenge) {
    if (challenge) {
      for (let i = 0; i < challenge.timelines.length; i++) {
        if (typeof challenge.timelines[i].deadline.indexOf == 'function' && challenge.timelines[i].deadline.indexOf('T') > -1) {
          challenge.timelines[i].deadline = challenge.timelines[i].deadline.substring(0, 16);
          let timeSplits = challenge.timelines[i].deadline.split('T');
          challenge.timelines[i].deadline = timeSplits[0] + " " + timeSplits[1];
          console.log(challenge.timelines[i].deadline);
        }
      }
      this.challenge = challenge;
    }
    console.log('timelines' + ' ' + challenge);
    if (!this.challenge.timelines) this.challenge.timelines = new Array<Timeline>();
    // this.timelines = timelines;
  }
  addTimelineCard() {
    this.challenge.timelines.push(new Timeline());
  }
  handleUpdateValue(value: { orderNum: number, timeline: Timeline }) {
    this.challenge.timelines[value.orderNum] = value.timeline;
    this.setSortTimeline();
  }
  handleDeleteTimeline(orderNum) {
    this.timelines.splice(orderNum, 1);
    this.setSortTimeline();
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
  updateChallenge() {
    console.log(this.challenge);
    this.cv.updateChallenge(this.challenge, parseInt(this.challenge._id)).subscribe(res => {
      console.log(res);
      this.cv.challengeSource.next(this.challenge);
    });
  }
}
