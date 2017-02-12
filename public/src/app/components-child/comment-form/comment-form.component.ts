import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  private commentForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.commentForm = this.fb.group({
      comment: ['', Validators.compose([Validators.required, Validators.maxLength(140)])],
    });

  }
  createComment(){

  }
}
