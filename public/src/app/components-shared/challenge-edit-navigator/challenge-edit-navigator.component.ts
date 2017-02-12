import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TypeService} from '../../services/type.service';

import { Type } from '../../classes/type';
@Component({
  selector: 'app-challenge-edit-navigator',
  templateUrl: './challenge-edit-navigator.component.html',
  styleUrls: ['./challenge-edit-navigator.component.css']
})
export class ChallengeEditNavigatorComponent implements OnInit {
  private current: string;
  private types: Type[];
  @Output() reviewCall = new EventEmitter();
  @Input() private id: number;
  constructor(private router: Router, private route: ActivatedRoute, private ts: TypeService) {
    ts.types$.subscribe(types => this.renderTypes(types));
  }
  renderTypes(types) {
    console.log(types);
    this.types = types;
  }
  ngOnInit() {
    this.current = 'basics';
  }
  onTypeClick(type) {
    this.ts.typeSource.next(type._id);
    this.router.navigate([`/challenges/${this.id}/edit/others/${type._id}`]);
  }
  onBasicClick() {
    this.ts.typeSource.next('basic');
    this.router.navigate([`/challenges/${this.id}/edit`]);
  }
  onTimeClick(){
    this.ts.typeSource.next('time-line');
    this.router.navigate([`/challenges/${this.id}/edit/timeline`]);
  }
  changeClass(current) {
    this.current = current;
  }
  onSubmitReview(){
    console.log('here');
    this.reviewCall.next();
  }
}
