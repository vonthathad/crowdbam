import { Injectable } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'

@Injectable()
export class CustomValidatorService {
    private errorMessage: Array<string>;
    constructor() { }
    requiredArray(control: FormControl) {
        return (control.value.length > 0) ? null : { 'required': true };
    }
    maxLengthArray(control: FormControl) {
        return (control.value.length < 5) ? null : { 'maxLength': true };
    }
    
    buildErrorMessage(control: FormControl) {
        this.errorMessage = [];
        this.buildControlErrorMessages(control);
        return this.errorMessage;
    }
    buildControlErrorMessages(control: FormControl) {
        if (control.hasError('required')) {
            this.errorMessage.push('This field is required.')
        } else if (control.hasError('maxLength')) {
            this.errorMessage.push('Ensure you have no more than 5 categories selected.')
        }
    }
}

export var CUSTOM_VALIDATOR_PROVIDER: Array<any> = [
    { provide: CustomValidatorService, useClass: CustomValidatorService }
]