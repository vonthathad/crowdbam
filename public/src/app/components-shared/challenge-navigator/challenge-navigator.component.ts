import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {TypeService} from '../../services/type.service';

import { Type } from '../../classes/type';
@Component({
  selector: 'app-challenge-navigator',
  templateUrl: './challenge-navigator.component.html',
  styleUrls: ['./challenge-navigator.component.css']
})
export class ChallengeNavigatorComponent implements OnInit {
  @Input() private types: Type[];
  @Input() private id: number;
  constructor(private router: Router, private route: ActivatedRoute, private ts: TypeService) {
  }

  ngOnInit() {

  }
  onTypeClick(type) {
    this.ts.currentTopicSource.next(type._id);
    this.router.navigate([`/challenges/${this.id}/edit/others/${type._id}`]);
  }
  onBasicClick() {
    this.ts.currentTopicSource.next('basic');
    this.router.navigate([`/challenges/${this.id}/edit`]);
  }
  onTimeClick(){
    this.ts.currentTopicSource.next('time-line');
    this.router.navigate([`/challenges/${this.id}/edit/timeline`]);
  }
}
