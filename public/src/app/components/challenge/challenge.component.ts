import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

import { CustomValidatorService } from '../../services/custom-validator.service';
import { ChallengeService } from '../../services/challenge.service';
import { CategoryService } from '../../services/category.service';

import { Challenge } from '../../classes/challenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  private challengeForm: FormGroup;
  private errorEmail: string;
  private categoryOptions: { value: string, label: string }[];
  @ViewChild("fileInput") private fileInput;
  constructor(private cd: ChangeDetectorRef,private cvs: CustomValidatorService, private fb: FormBuilder, private challengeService: ChallengeService, private categoryService: CategoryService) {
      // this.categoryOptions = [
      //   {
      //     value: "category._id",
      //     label: "category.title"
      //   },
      //   {
      //     value: "category._id",
      //     label: "category.title"
      //   },
      //   {
      //     value: "category._id",
      //     label: "category.title"
      //   }
      //   // ['Animal Welfare', 'animal-welfare'],
      //   // ['Arts & Culture', 'art-culture'],
      //   // 'Education',
      //   // 'Energy',
      //   // 'Environment',
      //   // 'Finances'
      // ]

  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(res => this.renderCategoryOptions(res['data']));
    this.challengeForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(140)])],
      price: ['', Validators.compose([Validators.required, Validators.pattern("[0-9]+")])],
      categories: new FormArray([], Validators.compose([this.cvs.requiredArray, this.cvs.maxLengthArray]))
    });
  }
  renderCategoryOptions(categoryData) {
   
    var cat = [];
    categoryData.forEach(category => {
      cat.push(
        {
          value: category._id,
          label: category.title
        }
      )
    });
     this.categoryOptions = cat;
    this.cd.markForCheck();
  }
  createChallenge({value, valid}: { value: Challenge, valid: boolean }) {
    console.log(JSON.stringify(value));
    let input = new FormData();
    let fi = this.fileInput.nativeElement;
    input.append("file", fi);
    input.append("content", JSON.stringify(value));
    this.challengeService
      .createChallenge(input)
      .subscribe(data => console.log(JSON.stringify(data)), error => console.error(JSON.stringify(error)));

  }
  fileChange(input) {

  }
}
