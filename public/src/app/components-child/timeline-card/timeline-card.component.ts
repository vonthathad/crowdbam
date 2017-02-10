import {Input, Output, Component, OnInit, EventEmitter } from '@angular/core';

import {Timeline} from '../../classes/timeline';
import {DropdownValue} from '../../classes/dropdown-value';
@Component({
  selector: 'app-timeline-card',
  templateUrl: './timeline-card.component.html',
  styleUrls: ['./timeline-card.component.css']
})
export class TimelineCardComponent implements OnInit {
  private title: string;
  private otherValue: string;
  private dropdownValues: DropdownValue[];
  private inputHidden: boolean;
  private deadline: string  ;
  private description: string;
  @Input() orderNum: number;
  @Output() updateValue = new EventEmitter();
  constructor() { }
  
  ngOnInit() {
    this.dropdownValues = new Array<DropdownValue>();
    this.dropdownValues.push(new DropdownValue('Funding', 'Funding'));
    this.dropdownValues.push(new DropdownValue('Pre registration', 'Pre registration'));
    this.dropdownValues.push(new DropdownValue('Enter', 'Enter'));
    this.dropdownValues.push(new DropdownValue('Registration Closed', 'Registration Closed'));
    this.dropdownValues.push(new DropdownValue('Submission Deadline', 'Submission Deadline'));
    this.dropdownValues.push(new DropdownValue('Judging', 'Judging'));
    this.dropdownValues.push(new DropdownValue('Judging Close', 'Judging Close'));
    this.dropdownValues.push(new DropdownValue('Voting Open', 'Voting Open'));
    this.dropdownValues.push(new DropdownValue('Voting Close', 'Voting Close'));
    this.dropdownValues.push(new DropdownValue('Winner Announced', 'Winner Announced'));
    this.dropdownValues.push(new DropdownValue('Closed', 'Closed'));
    this.dropdownValues.push(new DropdownValue('Other', 'Other'));
    this.inputHidden = true;
    this.otherValue = '';
  }
  _updateValue(){
    this.updateValue.emit({orderNum: 1,timeline:new Timeline(this.title, this.description, this.deadline)});
    if(this.title == "Other"){
      this.inputHidden = false;
    } else {
      this.inputHidden = true;
    }
  }
}
