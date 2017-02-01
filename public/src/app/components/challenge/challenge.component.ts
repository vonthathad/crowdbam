import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { ChallengeService } from '../../services/challenge.service';

import { Challenge } from '../../classes/challenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  private challenge: Challenge;
  constructor(private cv: ChallengeService, private route: ActivatedRoute) {
    route.params.subscribe(params=>{
        cv.getChallenge(params['id']).subscribe((res: any)=>{
          this.challenge = res.data;
          console.log(this.challenge);
        });
    });
   }

  ngOnInit() {
  
  }
}
