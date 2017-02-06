import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TypeService } from '../../services/type.service'

import { Type } from '../../classes/type';

@Component({
  selector: 'app-challenge-edit-wrapper',
  templateUrl: './challenge-edit-wrapper.component.html',
  styleUrls: ['./challenge-edit-wrapper.component.css']
})
export class ChallengeEditWrapperComponent implements OnInit {
  private id: number;
  private type: string;
  private types: Type[];
  private isBasic: boolean;
  private isTimeline: boolean;
  private isHtml: boolean;
  constructor(private ts: TypeService, private route: ActivatedRoute) {
    ts.getTypes()
      .subscribe(res => this.types = res['data']);
    // ts.currentTopic$.subscribe(type=>{
    //   this.type = type;
    // });
    route.params.subscribe(params => {
      this.id = params['id']
      this.type = params['type']
    });
  }

  ngOnInit() {
    this.isBasic = false;
    this.isTimeline = false;
    this.isHtml = false;
    let location = window.location.href;
    if (location.indexOf('/edit/') > -1) {
      this.isHtml = true;
      console.log(3);
    } else if (location.indexOf('/edit-timeline') > -1) {
      this.isTimeline = true;
      console.log(2);
    } else {
      this.isBasic = true;
      console.log(1);
    }
  }

}
