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

      // for (let i = 0; i < challenge.timelines.length; i++) {
      //   if (typeof challenge.timelines[i].deadline.indexOf == 'function' && challenge.timelines[i].deadline.indexOf('T') > -1) {
      //     challenge.timelines[i].deadline = challenge.timelines[i].deadline.substring(0, 16);
      //     let timeSplits = challenge.timelines[i].deadline.split('T');
      //     challenge.timelines[i].deadline = timeSplits[0] + " " + timeSplits[1];
      //   }
      // }
      this.setTimeline(challenge);
      this.setStatusTimeline(challenge);
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
    console.log('sort');
    this.setTimeline(this.challenge);
    this.setSortTimeline();
    this.setStatusTimeline(this.challenge);
  }
  setTimeline(challenge){
    for (let i = 0; i < challenge.timelines.length; i++) {
      let date;
      if (challenge.timelines[i].deadlineDate) {
        date = new Date(challenge.timelines[i].deadlineDate).getTime();
        challenge.timelines[i].deadline = date.toString();
      }
      // else {
      //   date = parseInt(challenge.timelines[i].deadline);
      //   challenge.timelines[i].deadlineDate = new Date(date);
      // }
    }
  }
  setStatusTimeline(challenge){
    let now = (new Date()).getTime();
    // let options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    let currentFilted = false;
    for (let i = 0; i < challenge.timelines.length; i++) {
      if (challenge.timelines[i].deadline > now) {
        if (!currentFilted) {
          challenge.timelines[i].status = 'current';
          currentFilted = true;
        } else {
          challenge.timelines[i].status = 'next';
        }
      } else {
        challenge.timelines[i].status = 'pass';
      }

    }
  }
  handleDeleteTimeline(orderNum) {
    this.timelines.splice(orderNum, 1);
    this.setSortTimeline();
  }
  setSortTimeline() {
    this.timelines = this.challenge.timelines;
    this.timelines.sort((a, b) => {
      let timeStampA = parseInt(a.deadline);
      let timeStampB = parseInt(b.deadline);
      // console.log(timeStampA + ' / ' + timeStampB);
      if (timeStampA > timeStampB) return 1
      else if (timeStampA < timeStampB) return -1;
      return 0;
    });
  }
  updateChallenge() {
    let body = {};
    body["timelines"] = [];

    this.challenge.timelines.forEach(function(timeline:any){
        let obj = {};
        if(timeline.title) obj["title"] = timeline.title;
        if(timeline.description) obj["description"] = timeline.description;
        if(timeline.deadline) obj["deadline"] = timeline.deadline;
      body["timelines"].push(obj);
    });
    this.cv.updateChallenge(body, parseInt(this.challenge._id)).subscribe(res => {
      alert('Update success!');
    });
  }
}
