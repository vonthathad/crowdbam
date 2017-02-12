import { Input, Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import {Comment} from '../../classes/comment';
import {Challenge} from '../../classes/challenge';

import { CommentService } from '../../services/comment.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  @Input() private comment: Comment;
  @Input() private comments: Comment[];
  @Input() id: string;
  private isSubmitting: boolean = false;
  private commentForm: FormGroup;
  constructor(private us:UserService, private cs: CommentService, private fb: FormBuilder) {
    us.loggedUserSource.subscribe(user=>{
      console.log(user);
    });
  }

  ngOnInit() {
    this.commentForm = this.fb.group({
      content: ['', Validators.compose([Validators.required, Validators.maxLength(140)])],
    });

  }
  createComment({value, valid}: {value: any, valid: boolean}){
    this.isSubmitting = true;
    value.challenge = this.id;
    if(this.comment){
      value.comment = this.comment._id;
    }

    console.log(value);
    this.cs.createComment(value).subscribe((res:any)=>this.succeed(res.data));
  }
  succeed(comment){
    this.isSubmitting = false;
    console.log(this.comments);
    if(this.comment){
      this.comments.forEach((cmt)=>{
        if(cmt._id == this.comment._id){
          if(!cmt.comments){
            cmt["comments"] = [];
          };
          cmt.comments.unshift(comment);
        }
      })
    } else {
      this.comments.unshift(comment);
    }
    // console.log(this.comment);
    // console.log(this.comments);
    // this.comments.unshift(this.comment);
    this.cs.passComments(this.comments);
    // this.comments
  }
}
