import { Component, Input, DoCheck, SimpleChanges } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { FileValidatorService } from '../../services/file-validator.service'

@Component({
  selector: 'app-validated-upload',
  templateUrl: './validated-upload.component.html',
  styleUrls: ['./validated-upload.component.css']
})
export class ValidatedUploadComponent implements DoCheck {
  @Input() control: FormControl = new FormControl();
  @Input() private imgSrc: string;
  private errorMessages: Array<string> = [];
  private isValid: boolean;
  public fileInput: any;
  private numberOfClicks: number = 0;
  constructor(private fvs: FileValidatorService) { }

  ngOnInit() {

  }
  ngDoCheck() {
    this.errorMessages = this.fvs.buildErrorMessage(this.control);
    this.isValid = this.errorMessages.length === 0;
  }

  fileChangeEvent(fileInput: any) {
    this.numberOfClicks++;
    this.control.setValue(fileInput);

    this.fileInput = fileInput;
    if (fileInput.target.value && fileInput.target.files && fileInput.target.files[0]) {
      let file = fileInput.target.files[0];

      if (file.type.indexOf("image") == -1  || file.size > 300000) {
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
      img.onload = () => {
        this.control.setValue(img);
        if (img.width < 700 || img.height < 400) {
          this.resetImgUpload();
        } else {
          this.imgSrc = e.target.result;
        }
      };
    }
    reader.readAsDataURL(file);
  }
  resetImgUpload() {
    this.fileInput.target.value = null;
    this.imgSrc = '';
  }
}
