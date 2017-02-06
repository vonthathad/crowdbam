import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FroalaEditorDirective, FroalaViewDirective } from '../../directives/froala/froala.directive';

import {Type} from '../../classes/type';
@Component({
  selector: 'app-challenge-edit-html',
  templateUrl: './challenge-edit-html.component.html',
  styleUrls: ['./challenge-edit-html.component.css']
})
export class ChallengeEditHtmlComponent implements OnInit {
  private id: number;
  @Input() type: Type;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  public titleOptions: Object = {
    placeholderText: 'Edit Your Content Here!',
    charCounterCount: false,
    toolbarInline: true,
    events: {
      'froalaEditor.initialized': function () {
        console.log('initialized');
      }
    }
  }
  public myTitle: string;
}
