import { Component, OnInit, Input } from '@angular/core';
import { Challenge } from '../../classes/challenge';
@Component({
  selector: 'app-card-challenge',
  templateUrl: './card-challenge.component.html',
  styleUrls: ['./card-challenge.component.css']
})
export class CardChallengeComponent implements OnInit {
  @Input() challenge: Challenge;
  constructor() { }

  ngOnInit() {
  }

}
