import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ChallengeService } from '../../services/challenge.service';

import { Challenge } from '../../classes/challenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  private challenge: Challenge;
   name: string = "Ringo";
  names: string[] = ["John", "Paul", "George", "Ringo"]
  constructor(private cv: ChallengeService, private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(params=>{
        cv.getChallenge(params['id']).subscribe((res: any)=>{
          this.challenge = res.data;
          console.log(this.challenge);
        });
    });
   }

  ngOnInit() {
  }
  onEditChallengeClick(){
    this.router.navigate(['challenges/' + this.challenge.id + '/edit']);
  }
}
