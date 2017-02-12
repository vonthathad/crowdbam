import { Input, Component, OnInit } from '@angular/core';

import { Comment } from '../../classes/comment';
import {Challenge} from '../../classes/challenge';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() private comment: Comment;
  @Input() private comments: Comment[];
  @Input() private id: string;
  private commentFormOpenned: boolean;
  private time: Date;
  // private hiddeComm
  constructor() {
  }

  ngOnInit() {
    // console.log(this.comments);
    if(this.comment.modified) this.time = this.comment.modified;
    else this.time = this.comment.created;

    this.commentFormOpenned = false;
  }
  onReplyClick(){
    this.commentFormOpenned = !this.commentFormOpenned;
    console.log(this.commentFormOpenned);
  }

}
