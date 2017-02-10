import { Component, OnInit } from '@angular/core';
import { Timeline } from '../../classes/timeline';

import { OrderByPipe } from '../../pipes/orderBy.pipe';
@Component({
  selector: 'app-challenge-edit-timeline',
  templateUrl: './challenge-edit-timeline.component.html',
  styleUrls: ['./challenge-edit-timeline.component.css']
})
export class ChallengeEditTimelineComponent implements OnInit {
  private timelines: Timeline[];
  private _timelines: Timeline[];

  constructor() { }

  ngOnInit() {
    this.timelines = Array<Timeline>();
  }
  addTimelineCard() {
    this.timelines.push(new Timeline());
  }
  handleUpdateValue(value: { orderNum: number, timeline: Timeline }) {
    this.timelines[value.orderNum] = value.timeline;
    this.setSortTimeline();
  }
  handleDeleteTimeline(orderNum){
    this.timelines.splice(orderNum, 1);
    this.setSortTimeline();
  }
  setSortTimeline(){
this._timelines = this.timelines;
    this._timelines.sort((a, b) => {
      let timeStampA =  new Date(a.deadline).getTime();
      let timeStampB =  new Date(b.deadline).getTime();
      console.log(timeStampA + ' / ' + timeStampB);
      if (timeStampA > timeStampB) return 1
      else if (timeStampA < timeStampB) return -1;
      return 0;
    });
  }
  saveTimelines(){

  }
}
