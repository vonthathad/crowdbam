import { Component, Input, DoCheck, OnChanges, SimpleChanges } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { CustomValidatorService } from '../../services/custom-validator.service';

@Component({
  selector: 'app-validated-multicheckbox',
  templateUrl: './validated-multicheckbox.component.html',
  styleUrls: ['./validated-multicheckbox.component.css']
})
export class ValidatedMulticheckboxComponent implements DoCheck, OnChanges {
  @Input() control: FormControl = new FormControl();
  @Input() options: any;
  @Input() model: any;
  private errorMessages: Array<string> = [];
  private isValid: boolean;
  private numberOfClicks: number = 0;
  private isChoosen = true;
  constructor(private cvs: CustomValidatorService) { }
  ngOnInit() {
  }
  ngDoCheck() {
    this.errorMessages = this.cvs.buildErrorMessage(this.control);
    this.isValid = this.errorMessages.length === 0;
  }
  ngOnChanges(changes: SimpleChanges) {
    // var tempOption = this.options;
    // this.options = null;
    // this.options
    console.log(this.options);

    var currentScheduleControls: FormArray = this.model as FormArray;
    if (this.options) {
      this.options.forEach(option => {
        if (option.isChoosen) {
          currentScheduleControls.push(new FormControl(option))
        }
      });
    }
    console.log(currentScheduleControls.value);
  }
  // public hasOption(option): boolean {
  //   return (this.model.value.indexOf(option) > -1);
  // }
  changeCheckbox(option: any, $event) {
    this.numberOfClicks++;
    option.isChoosen = $event.target.checked;
    var currentScheduleControls: FormArray = this.model as FormArray;
    var index = currentScheduleControls.value.indexOf(option);
    if (index > -1) currentScheduleControls.removeAt(index);
    else currentScheduleControls.push(new FormControl(option));
  }
}
