import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

import { CustomValidatorService } from '../../services/custom-validator.service';
import { FileValidatorService } from '../../services/file-validator.service';
import { ChallengeService } from '../../services/challenge.service';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';

import { Challenge } from '../../classes/challenge';
@Component({
  selector: 'app-challenge-solution-create',
  templateUrl: './challenge-solution-create.component.html',
  styleUrls: ['./challenge-solution-create.component.css']
})
export class ChallengeSolutionCreateComponent implements OnInit {
  private solutionForm: FormGroup;
  constructor(private cvs: CustomValidatorService,private fvs: FileValidatorService,private fb: FormBuilder) { }

  ngOnInit() {
    this.solutionForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(140)])],
      html: ['', Validators.compose([Validators.required])],
    });
  }

}
