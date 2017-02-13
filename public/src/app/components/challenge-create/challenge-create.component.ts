import {Component, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormArray, Validators, FormBuilder} from '@angular/forms';

import {CustomValidatorService} from '../../services/custom-validator.service';
import {FileValidatorService} from '../../services/file-validator.service';
import {ChallengeService} from '../../services/challenge.service';
import {CategoryService} from '../../services/category.service';
import {UserService} from '../../services/user.service';

import {Challenge} from '../../classes/challenge';

import {ValidatedUploadComponent} from '../../components-child/validated-upload/validated-upload.component';

@Component({
  selector: 'app-challenge-create',
  templateUrl: './challenge-create.component.html',
  styleUrls: ['./challenge-create.component.css']
})
export class ChallengeCreateComponent implements OnInit {

  private challengeForm: FormGroup;
  private categoryOptions: {value: string, label: string}[];
  private isSubmitting: boolean = false;
  // @ViewChild("fileInput") private fileInput;
  @ViewChild(ValidatedUploadComponent) vuc: ValidatedUploadComponent;

  constructor(private cvs: CustomValidatorService, private fvs: FileValidatorService, private fb: FormBuilder, private challengeService: ChallengeService, private categoryService: CategoryService, private us: UserService, private router: Router) {
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(res => this.renderCategoryOptions(res['data']));
    this.challengeForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
      prize: ['', Validators.compose([Validators.required, Validators.pattern("[0-9]+")])],
      img: ['', Validators.compose([this.fvs.hasFile, this.fvs.isFile, this.fvs.isTooSmall, this.fvs.isTooBig])],
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

  createChallenge({value, valid}: {value: Challenge, valid: boolean}) {
    // console.log( this.fileInput.nativeElement.files[0]);

    let fileInput = this.vuc.fileInput;
    // console.log(this.fileInput.target.files[0]);
    if (this.us.isLoggedIn()) {
      // alert(1234);
      // console.log(JSON.stringify(value));
      this.isSubmitting = true;
      if (fileInput && fileInput.target && fileInput.target.files && fileInput.target.files[0]) {
        let input = new FormData();
        let fi = fileInput.target.files[0];
        // let fi = this.fileInput.nativeElement.files[0];

        var tempCategories: any = value.categories;
        value.categories = [];
        tempCategories.forEach((category) => value.categories.push(category.value));

        input.append("file", fi);
        input.append("content", JSON.stringify(value));
        this.challengeService
          .createChallenge(input)
          .subscribe(challenge => {
            this.suceed(challenge['data']);
            this.isSubmitting = false;
          }, error => {
            console.error(JSON.stringify(error));
            this.isSubmitting = false;
          });
      }
    } else {
      this.us.openLoginDialog();
    }
  }

  suceed(challenge) {
    location.href = '/challenges/' + challenge._id;
  }

  // fileChange() {
  // let fi = this.fileInput.nativeElement.files[0];
  // console.log(fi);
  // if (fi.type.indexOf("img") == -1) {
  //   alert("Img require");
  //   this.fileInput.nativeElement.value = null;
  // }
  // }

}
