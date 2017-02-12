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
    value.challenge = this.id;
    if(this.comment){
      value.comment = this.comment._id;
    }

    console.log(value);
    this.cs.createComment(value).subscribe(comment=>this.succeed(comment));
  }
  succeed(comment){
    console.log(this.comment);
    // console.log(this.comment);
    // console.log(this.comments);
    if(this.comment){
      this.comments.map(e=>e._id).forEach((id,index)=>{
        this.comments.push(comment);
      })
    } else {
      this.comments.push(comment);
    }
    this.cs.passComments(this.comments);
    // this.comments
  }
}
