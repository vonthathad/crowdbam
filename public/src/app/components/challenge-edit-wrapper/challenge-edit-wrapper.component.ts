import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { TypeService } from '../../services/type.service'
import { ChallengeService } from '../../services/challenge.service';
import { CategoryService } from '../../services/category.service';

import { Type } from '../../classes/type';
import {ActionService} from "../../services/action.service";

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
  constructor(private aS: ActionService, private cv: ChallengeService, private ts: TypeService, private route: ActivatedRoute, private cas: CategoryService) {
    ts.getTypes()
      .subscribe(res => {
        this.types = res['data']
        ts.typesSource.next(this.types)
      });
    // ts.currentTopic$.subscribe(type=>{
    //   this.type = type;
    // });
    route.params.subscribe(params => {
      this.id = params['id']
      this.type = params['type']
    });
    this.cas.getCategories().subscribe(res => this.cas.categoriesSource.next(res['data']));
  }

  ngOnInit() {
    this.isBasic = false;
    this.isTimeline = false;
    this.isHtml = false;
    let location = window.location.href;
    if (location.indexOf('/edit/') > -1) {
      this.isHtml = true;
    } else if (location.indexOf('/edit-timeline') > -1) {
      this.isTimeline = true;
    } else {
      this.isBasic = true;
    }

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.cv.getChallenge(this.id).subscribe((res: any) => {
        this.cv.challengeSource.next(res['data'])
      });
    });
  }
  onSubmitReview(){
    this.aS.submitReview(this.id);
  }

}
