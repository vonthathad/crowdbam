import { Component, OnInit } from '@angular/core';

import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

import { CustomValidatorService } from '../../services/custom-validator.service';
@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  private challengeForm: FormGroup;
  private errorEmail: string;
  private categoryOptions: string[];
  constructor(private cvs: CustomValidatorService, private fb: FormBuilder) {
    this.categoryOptions = [
      'Animal Welfare',
      'Arts & Culture',
      'Education',
      'Energy',
      'Environment',
      'Finances'
    ]
   }

  ngOnInit() {
    this.challengeForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(140)])],
      categories: new FormArray([], Validators.compose([this.cvs.requiredArray, this.cvs.maxLengthArray]))
    });
  }

}
