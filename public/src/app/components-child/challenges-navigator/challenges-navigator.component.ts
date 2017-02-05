import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-challenges-navigator',
  templateUrl: './challenges-navigator.component.html',
  styleUrls: ['./challenges-navigator.component.css']
})
export class ChallengesNavigatorComponent implements OnInit {

  constructor(private router:Router, private route:ActivatedRoute) {
    route.params
   }

  ngOnInit() {
  }
    onOverviewClick() {
    // this.router.navigate([`/challenges/${this.id}/overview`]);
  }
}
