import { Injectable } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Injectable()
export class FileValidatorService {
    private errorMessage: Array<string>;
    private fileInput: any = '4';
    constructor() { }
    hasFile(control: any) {
        // console.log("this.fileInput " + control.value);
        return (control.value) ? null : { 'hasFile': true };
    }
    isFile(control: any) {
        let fileInput = control.value;
        if (!fileInput.target) return null;

        let file = fileInput.target.files[0];
        return (file.type.indexOf('image') > -1) ? null : { 'isFile': true };
    }
    isTooSmall(control: any) {
        let img = control.value;
        if (img && typeof img == 'Image') return null;
        if (img.width == undefined || img.height == undefined ) return null;
        return (img.width >= 700 && img.height >= 400) ? null : { 'isTooSmall': true }
    }
    isTooBig(control: any){
        let fileInput = control.value;
        if (!fileInput.target) return null;

        let file = fileInput.target.files[0];
        return (fileInput.target && file.size <= 300000) ? null : { 'isTooBig': true };
    }
    buildErrorMessage(control: any) {
        this.errorMessage = [];
        this.buildControlErrorMessages(control);
        return this.errorMessage;
    }
    buildControlErrorMessages(control: FormControl) {
        if (control.hasError('hasFile')) {
            this.errorMessage.push('Image is required.')
        } else if (control.hasError('isFile')) {
            this.errorMessage.push('File must be an image.')
        } else if (control.hasError('isTooSmall')) {
            this.errorMessage.push('File must larger than 700x400')
        } else if (control.hasError('isTooBig')) {
            this.errorMessage.push('File must not bigger than 300KB')
        }
    }
}

export var FILE_VALIDATOR_PROVIDER: Array<any> = [
    { provide: FileValidatorService, useClass: FileValidatorService }
];
