import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Rest } from './rest';

import { Comment } from '../classes/comment';
@Injectable()
export class CommentService {
  private rest: Rest;
  public comment: Comment;
  public comments: Comment[];
  // private loginDialog: any;
  public commentsSource = new Subject<Comment[]>();

  constructor(private http: Http) {
    this.rest = new Rest(http);
    // this.loggedUser$.subscribe(user => {this.user = user;});
    this.commentsSource.subscribe(comments => {
      this.comments = comments;
    });
  }
  passComments(comments){
    console.log(comments);
    this.commentsSource.next(comments);
  }
  // GET CHELLENGE LIST
  getComments(queryArgs?: Object): Observable<any[]> {
    var token = this.rest.getToken();
    let headers = new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.rest.get({
      url: `api/comments`,
      queryArgs: queryArgs,
      headers: headers
    });
  }
  // GET CHALLENGE
  getComment(id: number): Observable<any[]> {
    var token = this.rest.getToken();
    let headers = new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.rest.get({
      url: `api/comments/${id}`,
      headers: headers
    });
  }
  // CREATE CHALLENGE
  createComment(input: any): Observable<any[]> {
    var token = this.rest.getToken();
    let headers = new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({ headers: headers });

    // console.log("Comment " + JSON.stringify(input));
    return this.rest.post({
      url: `api/comments`,
      body: input,
      headers: headers
    });

    // return this.http
    //     .post("http://localhost:8456/api/comments", input, options)
    //     .map((res: any) => res.json())
    //     .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  // UPDATE CHALLENGE
  updateComment(comment: any, id: number): Observable<any[]> {
    var token = this.rest.getToken();
    let headers = new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.rest.put({
      url: `api/comments/${id}`,
      body: comment,
      headers: headers
    });
  }
  actionComment(id: number,action:string): Observable<any[]> {
    var token = this.rest.getToken();
    let headers = new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.rest.put({
      url: `api/comments/${id}/${action}`,
      headers: headers
    });
  };
  // UPDATE CHALLENGE IMAGE
  updateCommentImg(input: any, id: number): Observable<any[]> {
    var token = this.rest.getToken();
    let headers = new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': null
    });
    // console.log("Comment " + JSON.stringify(input));
    // return this.rest.post({
    //     url: `api/comments`,
    //     body: comment,
    //     headers: headers
    // });

    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(`/api/comments/${id}/image`, input, options)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));;
  }

}

export var COMMENT_PROVIDER: Array<any> = [
  { provide: CommentService, useClass: CommentService }
]
