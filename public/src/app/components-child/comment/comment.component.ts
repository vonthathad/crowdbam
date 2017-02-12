import { Input, Component, OnInit } from '@angular/core';

import { Comment } from '../../classes/comment';

import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() private comment: Comment;
  private time: Date;
  // private hiddeComm
  constructor(private cs: CommentService) { }

  ngOnInit() {
    console.log(this.comment);
    if(this.comment.modified) this.time = this.comment.modified;
    else this.time = this.comment.created;
  }
  onReplyClick(){
  }

}
