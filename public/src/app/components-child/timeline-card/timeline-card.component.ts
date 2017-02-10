import { Input, Output, Component, OnInit, EventEmitter } from '@angular/core';

import { Timeline } from '../../classes/timeline';
import { DropdownValue } from '../../classes/dropdown-value';
@Component({
  selector: 'app-timeline-card',
  templateUrl: './timeline-card.component.html',
  styleUrls: ['./timeline-card.component.css']
})
export class TimelineCardComponent implements OnInit {
  private title: any;
  private otherValue: string;
  private dropdownValues: DropdownValue[];
  private inputHidden: boolean;
  private deadline: string;
  private description: string;
  private hiddenOption :boolean;
  @Input() timeline: Timeline;
  @Input() orderNum: number;
  @Output() updateValue = new EventEmitter();
  @Output() deleteTimeline = new EventEmitter();
  constructor() {
  }

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
    this.otherValue = '';
    // setTimeout(() => {
      // this.title = { value: this.timeline.title, label: this.timeline.title };
      let foundTitle = true;
      this.dropdownValues.forEach(dropdownValue=>{
        if(dropdownValue.value == this.timeline.title){
          this.title = dropdownValue;
          foundTitle = false;
        }
      })
      if(foundTitle){
        this.title = this.dropdownValues[0];
      }
    
    // }, 100)
    this.hiddenOption = false;
  }
  removeOption(){
    this.hiddenOption = true;
  }
  _updateValue() {
    this.timeline.title = this.title.value;
    if (this.title.value == "Other") {
      this.inputHidden = false;
      this.timeline.title += `: ${this.otherValue}`;
    } else {
      this.inputHidden = true;
    }
    this.updateValue.emit({ orderNum: this.orderNum, timeline: this.timeline });
  }
  _deleteTimeline() {
    this.deleteTimeline.emit(this.orderNum);
  }
}
