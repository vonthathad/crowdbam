import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TypeService } from '../../services/type.service';

import { Type } from '../../classes/type';
@Component({
  selector: 'app-challenge-navigator',
  templateUrl: './challenge-navigator.component.html',
  styleUrls: ['./challenge-navigator.component.css']
})
export class ChallengeNavigatorComponent implements OnInit {
  private current: string;
  @Input() private types: Type[];
  @Input() private id: number;
  private overview: string = 'overview';
  constructor(private router: Router, private route: ActivatedRoute, private ts: TypeService) {
  }
  ngOnInit() {
  }
  onTypeClick(type) {
    this.ts.currentTopicSource.next(type._id);
    this.router.navigate([`/challenges/${this.id}/others/${type._id}`]);
  }
  onTimeClick() {
    this.ts.currentTopicSource.next('time-line');
    this.router.navigate([`/challenges/${this.id}/timeline`]);
  }
  onCommentsClick() {
    this.ts.currentTopicSource.next('comments');
    this.router.navigate([`/challenges/${this.id}/comments`]);
  }
  changeClass(current) {
    this.current = current;
  }
}
