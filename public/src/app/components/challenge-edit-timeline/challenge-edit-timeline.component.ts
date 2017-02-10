import { Component, OnInit } from '@angular/core';


import { Timeline } from '../../classes/timeline';
@Component({
  selector: 'app-challenge-edit-timeline',
  templateUrl: './challenge-edit-timeline.component.html',
  styleUrls: ['./challenge-edit-timeline.component.css']
})
export class ChallengeEditTimelineComponent implements OnInit {
  private timelines: Timeline[];
  constructor() { }

  ngOnInit() {
    this.timelines = Array<Timeline>();
    this.timelines.push(new Timeline());
  }
  addTimelineCard() {
    this.timelines.push(new Timeline());
  }
  handleUpdateValue(value: { orderNum: number, timeline: Timeline }) {

    this.timelines.push(value.timeline);
  }
}
