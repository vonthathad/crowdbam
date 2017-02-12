import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FroalaEditorDirective, FroalaViewDirective } from '../../directives/froala/froala.directive';

import { Type } from '../../classes/type';
import { ContentService } from '../../services/content.service';
@Component({
  selector: 'app-challenge-edit-html',
  templateUrl: './challenge-edit-html.component.html',
  styleUrls: ['./challenge-edit-html.component.css']
})
export class ChallengeEditHtmlComponent implements OnInit {
  private id: number;
  private type: Type;
  private html: string;
  private isCreated: boolean;
  private subRoute: any;
  private subParentRoute: any;
  private inform: string;
  private showButton: boolean;
  constructor(private route: ActivatedRoute, private cs: ContentService) { }

  public titleOptions: Object = {
    placeholderText: 'Edit Your Content Here!',
    // charCounterCount: false,
    // toolbarInline: true,
    fileMaxSize: 1024 * 1024 * 2,
    heightMin: 300,
    fileAllowedTypes: ['application/pdf'],
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    // toolbarVisibleWithoutSelection: true,
    events: {
      'froalaEditor.initialized': function () {
        console.log('initialized');
      }
    }
  }

  ngOnInit() {
    // try{
    this.subParentRoute = this.route.parent.params.subscribe(params => {
      this.id = params['id'];
    });

    this.subRoute = this.route.params.subscribe(params => {
      this.type = null;
      this.showButton = false;
      this.type = params['type'];
      let input = {
        id: this.id,
        type: this.type,
      }
      this.isCreated = false;
      this.html = '';
      this.cs.getContent(input).subscribe(res => {
        if (res['data'] && res['data'].html) {
          this.html = res['data'].html;
          this.isCreated = true;
        }
        console.log(this.html);
      },
      err =>{},
      ()=>{this.showButton = true});
    });
  // }catch(e){}
  }
  informShow(mesg) {
    this.inform = mesg;
    setTimeout(() => {
      this.inform = '';
    }, 1000);
  }
  ngOnDestroy() {
    try{
    this.subParentRoute.unsubcribe();
    this.subRoute.unsubcribe();
    }catch(e){}
  }
  createContent() {
    let input = {
      id: this.id,
      type: this.type,
      data: { html: this.html }
    }
    console.log(this.html);
    this.cs.createContent(input).subscribe(res => {
      console.log(res);
      this.informShow(res['message']);
      this.isCreated = true;
      alert('Create successful');
    },
      err => {
        console.log(err);
        this.inform = JSON.parse(err['_body']).messages;
      });

  }
  updateContent() {
    let input = {
      id: this.id,
      type: this.type,
      data: { html: this.html }
    }
    console.log(this.html);
    this.cs.updateContent(input).subscribe(res => {
      console.log(res);

      this.informShow(res['message']);
      alert('Update successful');
    });
  }

  deleteContent() {
    let input = {
      id: this.id,
      type: this.type
    }
    this.cs.deleteContent(input).subscribe(res => {
      console.log(res);
      this.html = ''
      this.informShow(res['message']);
      this.isCreated = false;
      alert('Delete successful');
    });
  }
}
