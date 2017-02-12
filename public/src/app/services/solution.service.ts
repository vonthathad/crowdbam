/**
 * Created by dat on 11/02/2017.
 */

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Rest } from './rest';

import { Solution } from '../classes/solution';
@Injectable()
export class SolutionService {
  private rest: Rest;
  public solution: Solution;
  // private loginDialog: any;
  public solutionSource = new Subject<Solution>();
  public solution$ = this.solutionSource.asObservable();

  constructor(private http: Http) {
    this.rest = new Rest(http);
    // this.loggedUser$.subscribe(user => {this.user = user;});
    this.solution$.subscribe(solution => {
      this.solution = solution;
      console.log(JSON.stringify(this.solution));
    });
  }
  // GET CHELLENGE LIST
  getSolutions(queryArgs?: Object): Observable<any[]> {
    var token = this.rest.getToken();
    let headers = new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.rest.get({
      url: `api/solutions`,
      queryArgs: queryArgs,
      headers: headers
    });
  }
  // GET CHALLENGE
  getSolution(id: number): Observable<any[]> {
    var token = this.rest.getToken();
    let headers = new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.rest.get({
      url: `api/solutions/${id}`,
      headers: headers
    });
  }
  // CREATE CHALLENGE
  createSolution(s: Solution): Observable<any[]> {
    var token = this.rest.getToken();
    let headers = new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    let options = new RequestOptions({ headers: headers });

    // console.log("Solution " + JSON.stringify(input));
    return this.rest.post({
      url: `api/solutions`,
      body: s,
      headers: headers
    });

    // return this.http
    //     .post("http://localhost:8456/api/solutions", input, options)
    //     .map((res: any) => res.json())
    //     .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  // UPDATE CHALLENGE
  updateSolution(solution: any, id: number): Observable<any[]> {
    var token = this.rest.getToken();
    let headers = new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    console.log(solution);
    return this.rest.put({
      url: `api/solutions/${id}`,
      body: solution,
      headers: headers
    });
  }
  actionSolution(id: number,action:string): Observable<any[]> {
    var token = this.rest.getToken();
    let headers = new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    return this.rest.put({
      url: `api/solutions/${id}/${action}`,
      headers: headers
    });
  };
  // UPDATE CHALLENGE IMAGE
  updateSolutionImg(input: any, id: number): Observable<any[]> {
    var token = this.rest.getToken();
    let headers = new Headers({
      'Authorization': `Bearer ${token}`,
      'Content-Type': null
    });
    // console.log("Solution " + JSON.stringify(input));
    // return this.rest.post({
    //     url: `api/solutions`,
    //     body: solution,
    //     headers: headers
    // });

    let options = new RequestOptions({ headers: headers });
    return this.http
      .post(`/api/solutions/${id}/image`, input, options)
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));;
  }

}

export var SOLUTION_PROVIDER: Array<any> = [
  { provide: SolutionService, useClass: SolutionService }
]
