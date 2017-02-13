import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

import { SolutionService } from '../../services/solution.service';
import { ChallengeService } from '../../services/challenge.service';
import { UserService } from '../../services/user.service';

import { Solution } from '../../classes/solution';
import {User} from "../../classes/user";

@Component({
  selector: 'app-challenge-solution-edit',
  templateUrl: './challenge-solution-edit.component.html',
  styleUrls: ['./challenge-solution-edit.component.css']
})
export class ChallengeSolutionEditComponent implements OnInit {
  private solutionForm: FormGroup;
  private challengeId: number;
  private solutionId: number;
  private html: string;
  private user: User;
  private isSubmitting: boolean = false;
  constructor(private route: ActivatedRoute,private cs: ChallengeService, private us: UserService, private ss: SolutionService,private fb: FormBuilder) {
      us.loggedUserSource.subscribe(user =>{
        this.user = user;
      });
  }

  ngOnInit() {

    this.solutionForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
      html: ['', Validators.compose([Validators.required])],
    });
    if(this.us.user){
      this.user = this.us.user;
    }
    this.route.params.subscribe(params => {
      this.challengeId = params['id'];

      this.solutionId = params['sid'];
      this.ss.getSolution(this.solutionId).subscribe((res:any)=>{
        if(res.data.creator._id == this.user._id){
          this.html = res.data.html;
          this.solutionForm.patchValue({
            title: res.data.title,
            description:  res.data.description,
            html:  res.data.html
          })
        } else {
          location.href = '/';
        }

      });
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
