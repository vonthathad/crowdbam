import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ChallengeService } from '../../services/challenge.service';
import { SolutionService } from '../../services/solution.service';

import { Challenge } from '../../classes/challenge';
import { Solution } from '../../classes/solution';
@Component({
  selector: 'app-challenge-solutions',
  templateUrl: './challenge-solutions.component.html',
  styleUrls: ['./challenge-solutions.component.css']
})
export class ChallengeSolutionsComponent implements OnInit {
  private challenge: Challenge;
  private solutions: Solution[];
  constructor(private router: Router,private ss: SolutionService, private cs: ChallengeService) {
    cs.challengeSource.subscribe(challenge => this.getSolutions(challenge));
  }

  ngOnInit() {
    if(this.cs.challenge) this.getSolutions(this.cs.challenge);
  }
  getSolutions(challenge){
    this.challenge = challenge;
    this.ss.getSolutions({challenge: challenge._id}).subscribe((res:any) =>{
      this.renderSolutions(res.data);
    });
  }
  renderSolutions(solutions){
    this.solutions = solutions
    // console.log(res.data);
  }
  goToSolution(solution){
    this.router.navigate([`/challenges/${this.challenge._id}/solutions/${solution._id}`]);
  }
}
