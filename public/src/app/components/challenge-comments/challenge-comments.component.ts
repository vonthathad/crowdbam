import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { Comment } from '../../classes/comment';
import { User } from '../../classes/user';

import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-challenge-comments',
  templateUrl: './challenge-comments.component.html',
  styleUrls: ['./challenge-comments.component.css']
})
export class ChallengeCommentsComponent implements OnInit {
  private comments: Comment[];
  private user: User;
  private id: string;
  constructor(private us: UserService, private ro: ActivatedRoute, private cs: CommentService) {
    us.loggedUserSource.subscribe(user => {
      this.user = user;
    });
    cs.commentsSource.subscribe(comments =>{
      this.comments = comments;
    })
  }

  ngOnInit() {
    this.ro.parent.params.subscribe(params=>{
      this.id = params['id'];
      if(this.us.user){
        this.user = this.us.user;
      }
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
