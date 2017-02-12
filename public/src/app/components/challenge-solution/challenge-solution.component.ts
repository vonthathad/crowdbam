import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SolutionService } from '../../services/solution.service';

import { Solution } from '../../classes/solution';
import {UserService} from "../../services/user.service";
import {User} from "../../classes/user";
@Component({
  selector: 'app-challenge-solution',
  templateUrl: './challenge-solution.component.html',
  styleUrls: ['./challenge-solution.component.css']
})
export class ChallengeSolutionComponent implements OnInit {
  private solution: Solution;
  private user: User;
  constructor(private route: ActivatedRoute, private ss: SolutionService,private us: UserService) {
    us.loggedUserSource.subscribe(user =>{
      this.user = user;
    });
  }

  ngOnInit() {
    if(this.us.user){
      this.user = this.us.user;
    }
    this.route.params.subscribe((params:any)=>{
    this.ss.getSolution(params.sid).subscribe((res:any)=>this.renderSolution(res.data));
    });
  }
  renderSolution(solution){
    this.solution = solution;
  }

}
