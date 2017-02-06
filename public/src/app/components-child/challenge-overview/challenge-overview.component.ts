import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FroalaEditorDirective, FroalaViewDirective } from '../../directives/froala/froala.directive';
@Component({
  selector: 'app-challenge-overview',
  templateUrl: './challenge-overview.component.html',
  styleUrls: ['./challenge-overview.component.css']
})
export class ChallengeOverviewComponent implements OnInit {
  private id: number;
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
