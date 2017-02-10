import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TypeService } from '../../services/type.service'
import { ChallengeService } from '../../services/challenge.service';

import { Challenge } from '../../classes/challenge';
import { Type } from '../../classes/type';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  private id: number;
  private type: string;
  private types: Type[];
  private challenge: Challenge;
  name: string = "Ringo";
  names: string[] = ["John", "Paul", "George", "Ringo"]
  constructor(private cv: ChallengeService, private route: ActivatedRoute, private router: Router, private ts: TypeService) {
    route.params.subscribe(params => {
      cv.getChallenge(params['id']).subscribe((res: any) => {
        this.challenge = res.data;
        this.cv.challengeSource.next(res.data);
        console.log(this.challenge);
      });
    });


    ts.getTypes()
      .subscribe(res => this.types = res['data']);
    // ts.currentTopic$.subscribe(type=>{
    //   this.type = type;
    // });
    route.params.subscribe(params => {
      this.id = params['id']
      this.type = params['type']
    });
  }

  ngOnInit() {
  }
  onEditChallengeClick() {
    this.router.navigate(['challenges/' + this.challenge.id + '/edit']);
  }
}
