import { Component, Input, DoCheck } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { CustomValidatorService } from '../../services/custom-validator.service';

@Component({
  selector: 'app-validated-multicheckbox',
  templateUrl: './validated-multicheckbox.component.html',
  styleUrls: ['./validated-multicheckbox.component.css']
})
export class ValidatedMulticheckboxComponent implements DoCheck {
  @Input() control: FormControl = new FormControl();
  @Input() options: any;
  @Input() model: any;
  private errorMessages: Array<string> = [];
  private isValid: boolean;
  private numberOfClicks: number = 0;
  constructor(private cvs: CustomValidatorService) { }
  ngOnInit() {
  }
  ngDoCheck() {
    this.errorMessages = this.cvs.buildErrorMessage(this.control);
    this.isValid = this.errorMessages.length === 0;
  }

  public hasOption(option): boolean {
    return (this.model.value.indexOf(option) > -1);
  }
  changeCheckbox(option: any) {
    this.numberOfClicks++;
    var currentScheduleControls: FormArray = this.model as FormArray;
    var index = currentScheduleControls.value.indexOf(option);
    if (index > -1) currentScheduleControls.removeAt(index);
    else currentScheduleControls.push(new FormControl(option));
  }
}
