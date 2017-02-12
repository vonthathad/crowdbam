import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { Comment } from '../../classes/comment';

import { CommentService } from '../../services/comment.service';

@Component({
  selector: 'app-challenge-comments',
  templateUrl: './challenge-comments.component.html',
  styleUrls: ['./challenge-comments.component.css']
})
export class ChallengeCommentsComponent implements OnInit {
  private comments: Comment[];
  constructor(private ro: ActivatedRoute, private cs: CommentService) { }

  ngOnInit() {
    this.ro.parent.params.subscribe(params=>{
      this.cs.getComments({challenge: params['id']}).subscribe(res=>{
        this.renderComments(res['data']);
      });
    });
  }
  renderComments(comments){
    this.comments = Array<Comment>();
    let childComments = Array<Comment>();
    comments.forEach(comment =>{
      if(!comment.comment) this.comments.push(comment);
      else childComments.push(comment);
    });
    this.comments.forEach(comment =>{
      childComments.forEach(childComment=>{
        if(childComment.comment == comment._id){
          if(!comment.comments) comment.comments = Array<Comment>();
          comment.comments.push(childComment);
        }
      });
    });
    console.log(this.comments);
  }
}
