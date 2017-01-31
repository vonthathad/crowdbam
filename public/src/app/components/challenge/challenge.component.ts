import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

import { CustomValidatorService } from '../../services/custom-validator.service';
import { ChallengeService } from '../../services/challenge.service';

import { Challenge } from '../../classes/challenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  private challengeForm: FormGroup;
  private errorEmail: string;
  private categoryOptions: string[];
  @ViewChild("fileInput") private fileInput;
  constructor(private cvs: CustomValidatorService, private fb: FormBuilder, private cs: ChallengeService) {
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
      price: ['', Validators.compose([Validators.required, Validators.pattern("[0-9]+")])],
      categories: new FormArray([], Validators.compose([this.cvs.requiredArray, this.cvs.maxLengthArray]))
    });
  }
  createChallenge({value, valid}: { value: Challenge, valid: boolean }) {
    console.log(JSON.stringify(value));
    let input = new FormData();
    let fi = this.fileInput.nativeElement;
    // input.append("thumb", fi);
    input.append("thumb", "fi");
    input.append("title", "value.title");
    input.append("description", "value.description");
    input.append("prize",124);
    console.log("INPUT "+ input);
    this.cs
    .createChallenge(input, input)
    .subscribe(data => console.log(JSON.stringify(data)),error => console.error(JSON.stringify(error)));

  }
}
