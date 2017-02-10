import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

import { CustomValidatorService } from '../../services/custom-validator.service';
import { ChallengeService } from '../../services/challenge.service';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';
import { FileValidatorService } from '../../services/file-validator.service';

import { Challenge } from '../../classes/challenge';

import { ValidatedUploadComponent } from '../../components-child/validated-upload/validated-upload.component';

@Component({
  selector: 'app-challenge-edit-basic',
  templateUrl: './challenge-edit-basic.component.html',
  styleUrls: ['./challenge-edit-basic.component.css']
})
export class ChallengeEditBasicComponent implements OnInit {

  private challengeForm: FormGroup;
  private errorEmail: string;
  private imgSrc: string;
  private categoryOptions: { value: string, label: string, isChoosen: boolean }[];
  private challenge: Challenge;
  private id: number;
  @ViewChild(ValidatedUploadComponent) vuc: ValidatedUploadComponent;
  // @ViewChild("fileInput") private fileInput;
  constructor(private router: Router, private fvs: FileValidatorService, private route: ActivatedRoute, private cv: ChallengeService, private cd: ChangeDetectorRef, private cvs: CustomValidatorService, private fb: FormBuilder, private cas: CategoryService, private us: UserService) {
    cv.challange$.subscribe(challenge => this.renderChallenge(challenge));
    cas.categories$.subscribe(categories => this.renderCategoryOptions(categories))
  }

  ngOnInit() {
    if (this.cas.categories) this.renderCategoryOptions(this.cas.categories);
    this.challengeForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(140)])],
      prize: ['', Validators.compose([Validators.required, Validators.pattern("[0-9]+")])],
      img: ['', Validators.compose([this.fvs.hasFile, this.fvs.isFile, this.fvs.isTooSmall])],
      categories: new FormArray([], Validators.compose([this.cvs.requiredArray, this.cvs.maxLengthArray]))
    });
    console.log(JSON.stringify(this.cv.challenge));
    if (this.cv.challenge) this.renderChallenge(this.cv.challenge);
  }
  renderChallenge(challenge) {
    if (challenge) {
      this.challenge = challenge;
      console.log(this.challenge);
      this.challengeForm.patchValue({
        title: this.challenge.title,
        description: this.challenge.description,
        prize: this.challenge.prize,
      });
    }
    if (this.categoryOptions) {
      this.categoryOptions.forEach((_category) => {
        if (this.challenge.categories.find(category => { return category.id === _category.value })) {
          _category.isChoosen = true;
        };
      });
    }
    console.log(this.categoryOptions);
  }
  renderCategoryOptions(categoryData) {
    this.categoryOptions = [];
    categoryData.forEach(category => {
      this.categoryOptions.push(
        {
          value: category._id,
          label: category.title,
          isChoosen: false
        }
      )
    });
  }
  updateChallenge({value, valid}: { value: Challenge, valid: boolean }) {
    // console.log( this.fileInput.nativeElement.files[0]);
    if (this.us.isLoggedIn()) {
      let fileInput = this.vuc.fileInput;
      var tempCategories: any = value.categories;
      value.categories = [];
      tempCategories.forEach((category) => value.categories.push(category.value));

      // console.log(JSON.stringify(value));
      console.log(fileInput);
      if (fileInput && fileInput.target && fileInput.target.files && fileInput.target.files[0]) {
        let input = new FormData();
        let fi = fileInput.target.files[0];
        input.append("file", fi);
        alert(1234);
        // input.append("content", JSON.stringify(value));

        this.cv
          .updateChallengeImg(input, this.id)
          .subscribe(image => this._updateChallenger(image['link'], value), error => console.error(JSON.stringify(error)));
      } else {
        this._updateChallenger(this.imgSrc, value);
      }
    } else {
      this.us.openLoginDialog();
    }
  }
  _updateChallenger(imgUrl, challenger) {
    challenger.thumb = imgUrl;
    challenger.img = null;
    console.log(challenger);
    this.cv
      .updateChallenge(challenger, this.id)
      .subscribe(challenge => this.updateSucceeded(challenge, this.id), error => console.error(JSON.stringify(error)));
  }
  updateSucceeded(challenge, id) {
    console.log(challenge)
    alert('update successfull');
  }
  updateFailed() {
    alert('update failed');
  }
}
