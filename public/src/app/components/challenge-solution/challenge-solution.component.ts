import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SolutionService } from '../../services/solution.service';

import { Solution } from '../../classes/solution';
@Component({
  selector: 'app-challenge-solution',
  templateUrl: './challenge-solution.component.html',
  styleUrls: ['./challenge-solution.component.css']
})
export class ChallengeSolutionComponent implements OnInit {
  private solution: Solution;
  constructor(private route: ActivatedRoute, private ss: SolutionService) { }

  ngOnInit() {
    this.route.params.subscribe((params:any)=>{
    this.ss.getSolution(params.sid).subscribe((res:any)=>this.renderSolution(res.data));
    });
  }
  renderSolution(solution){
    this.solution = solution;
  }

}
