import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import { ChallengeService } from '../../services/challenge.service';

import { Challenge } from '../../classes/challenge';
@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  host: {
    '(document:click)': 'handleClick($event)',
  },
})
export class AutocompleteComponent implements OnInit {
  @ViewChild("input") private input;
  private query = '';
  // private challenges: Challenge[];
  private filteredList = [];
  private searchFinished: boolean;
  constructor(private elementRef: ElementRef, private challengeService: ChallengeService) { }

  ngOnInit() {
    this.searchFinished = true;
  }
  renderChallenges(challenges) {
    this.searchFinished = true;
    // this.challenges = challenges;
     this.filteredList = challenges;
    console.log(this.filteredList );
  }
  handleClick(event) {
    var clickedComponent = event.target;
    var inside = false;
    do {
      if (clickedComponent === this.elementRef.nativeElement) {
        inside = true;
      }
      clickedComponent = clickedComponent.parentNode;
    } while (clickedComponent);
    if (!inside) {
      this.filteredList = [];
    }
  }

  filter() {
    // if (this.query !== "") {
    //   this.filteredList = this.challenges.filter(function (el) {
    //     return el.title.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
    //   }.bind(this));
    //   this.filteredList = this.filteredList.slice(0,4);
    // } else {
    //   this.filteredList = [];
    // }
    if (this.query.length > 1) {
      if(this.searchFinished){
        this.searchFinished = false;
        this.challengeService
          .getChallenges({ paging: 4, text: this.query })
          .subscribe((res: any) => this.renderChallenges(res.data));
        }
    } else {
      if (this.query.length == 0) this.filteredList = [];
    }
  }

  select(title) {
    this.query = title;
    this.filteredList = [];
  }
  onInputClick() {
    this.input.nativeElement.select();
  }
}
