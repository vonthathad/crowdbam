import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';

import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

import { CustomValidatorService } from '../../services/custom-validator.service';
import { ChallengeService } from '../../services/challenge.service';
import { CategoryService } from '../../services/category.service';
import { UserService } from '../../services/user.service';

import { Challenge } from '../../classes/challenge';

@Component({
  selector: 'app-challenge',
  templateUrl: './challenge.component.html',
  styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent implements OnInit {
  private challengeForm: FormGroup;
  private errorEmail: string;
  private imgSrc: string;
  private categoryOptions: { value: string, label: string }[];
  // @ViewChild("fileInput") private fileInput;
  private fileInput: any;
  constructor(private cd: ChangeDetectorRef, private cvs: CustomValidatorService, private fb: FormBuilder, private challengeService: ChallengeService, private categoryService: CategoryService, private us: UserService) { }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(res => this.renderCategoryOptions(res['data']));
    this.challengeForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(140)])],
      prize: ['', Validators.compose([Validators.required, Validators.pattern("[0-9]+")])],
      categories: new FormArray([], Validators.compose([this.cvs.requiredArray, this.cvs.maxLengthArray]))
    });
  }
  renderCategoryOptions(categoryData) {
    this.categoryOptions = [];
    categoryData.forEach(category => {
      this.categoryOptions.push(
        {
          value: category._id,
          label: category.title
        }
      )
    });
  }
  createChallenge({value, valid}: { value: Challenge, valid: boolean }) {
    // console.log( this.fileInput.nativeElement.files[0]);
    if (this.us.checkLoggedInStatus()) {
      alert(1234);
      console.log(JSON.stringify(value));
      if (this.fileInput && this.fileInput.target && this.fileInput.target.files && this.fileInput.target.files[0]) {
        let input = new FormData();
        let fi = this.fileInput.target.files[0];
        // let fi = this.fileInput.nativeElement.files[0];

        var tempCategories: any = value.categories;
        value.categories = [];
        tempCategories.forEach((category) => value.categories.push(category.value));

        input.append("file", fi);
        input.append("content", JSON.stringify(value));
        this.challengeService
          .createChallenge(input)
          .subscribe(data => console.log(JSON.stringify(data)), error => console.error(JSON.stringify(error)));
      }
    } else {
      this.us.openLoginDialog();
    }
  }

  // fileChange() {
  // let fi = this.fileInput.nativeElement.files[0];
  // console.log(fi);
  // if (fi.type.indexOf("img") == -1) {
  //   alert("Img require");
  //   this.fileInput.nativeElement.value = null;
  // }
  // }

  fileChangeEvent(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      this.fileInput = fileInput;
      let file = fileInput.target.files[0];
      if (file.type.indexOf("image") == -1) {
        alert("Img required");
        this.resetImgUpload();
      } else {
        this.renderImg(file);
      }
    }
  }
  renderImg(file) {
    var reader = new FileReader();
    reader.onload = (e: any) => {
      let img = new Image();
      img.src = e.target.result;
      if (img.width < 1280 || img.height < 720) {
        alert("Image width must be larger than 1280");
        this.resetImgUpload();
      } else {
        this.imgSrc = e.target.result;
      }
    }
    reader.readAsDataURL(file);
  }
  resetImgUpload() {
    this.fileInput.target.value = null;
    this.imgSrc = '';
  }
}
