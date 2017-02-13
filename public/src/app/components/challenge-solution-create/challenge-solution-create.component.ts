import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

import { SolutionService } from '../../services/solution.service';
import { ChallengeService } from '../../services/challenge.service';
import { UserService } from '../../services/user.service';

import { Solution } from '../../classes/solution';
@Component({
  selector: 'app-challenge-solution-create',
  templateUrl: './challenge-solution-create.component.html',
  styleUrls: ['./challenge-solution-create.component.css']
})
export class ChallengeSolutionCreateComponent implements OnInit {
  private solutionForm: FormGroup;
  private challengeId: number;
  private isSubmitting: boolean = false;


  constructor(private route: ActivatedRoute,private router: Router, cs: ChallengeService, private us: UserService, private ss: SolutionService,private fb: FormBuilder) {
  }

  public titleOptions: Object = {
    placeholderText: 'Edit Your Content Here!',
    // charCounterCount: false,
    // toolbarInline: true,
    fileMaxSize: 1024 * 1024 * 2,
    heightMin: 300,
    fileAllowedTypes: ['application/pdf'],
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    // toolbarVisibleWithoutSelection: true,
    events: {
      'froalaEditor.initialized': function () {
        console.log('initialized');
      }
    }
  }

  ngOnInit() {
    this.solutionForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
      html: ['', Validators.compose([Validators.required])],
    });

    this.route.params.subscribe(params => {
      this.challengeId = params['id'];
    });
  }
  createSolution({value, valid}: {value: Solution, valid: boolean}){
    this.isSubmitting = true;
    console.log(value);
    if (this.us.isLoggedIn() && this.challengeId) {
      value.challenge = this.challengeId;
        this.ss
          .createSolution(value)
          .subscribe(s => {
            this.suceed(s['data']);
            this.isSubmitting = false;
          }, error => {
            console.error(JSON.stringify(error));
            this.isSubmitting = false;
          });
    } else {
      this.us.openLoginDialog();
    }
  }
  suceed(solution){
    this.router.navigate([`/challenges/${this.challengeId}/solutions/${solution._id}/edit`]);
  }
}
