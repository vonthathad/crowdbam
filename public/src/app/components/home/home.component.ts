import { Component, OnInit } from '@angular/core';
import {Challenge} from '../../classes/challenge';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private recommendedChallenges: Challenge[];
  private popularChallenges: Challenge[];
  constructor() { }

  ngOnInit() {
  }

}
