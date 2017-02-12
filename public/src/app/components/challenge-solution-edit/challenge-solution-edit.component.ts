import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

import { SolutionService } from '../../services/solution.service';
import { ChallengeService } from '../../services/challenge.service';
import { UserService } from '../../services/user.service';

import { Solution } from '../../classes/solution';

@Component({
  selector: 'app-challenge-solution-edit',
  templateUrl: './challenge-solution-edit.component.html',
  styleUrls: ['./challenge-solution-edit.component.css']
})
export class ChallengeSolutionEditComponent implements OnInit {
  private solutionForm: FormGroup;
  private challengeId: number;
  private solutionId: number;
  constructor(private route: ActivatedRoute,private cs: ChallengeService, private us: UserService, private ss: SolutionService,private fb: FormBuilder) {
  }

  ngOnInit() {
    this.solutionForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(140)])],
      html: ['', Validators.compose([Validators.required])],
    });

    this.route.params.subscribe(params => {
      this.challengeId = params['id'];
      this.solutionId = params['sid'];
    });
  }
  updateSolution({value, valid}: {value: Solution, valid: boolean}){
    console.log(value);
    if (this.us.isLoggedIn() && this.challengeId) {
      value.challenge = this.challengeId;
      this.ss
        .updateSolution(value, this.solutionId)
        .subscribe(s => this.suceed(s['data']), error => console.error(JSON.stringify(error)));
    } else {
      this.us.openLoginDialog();
    }
  }
  suceed(s){
    console.log(s);
  }
}
