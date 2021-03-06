import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Rest } from './rest';

import { Challenge } from '../classes/challenge';
@Injectable()
export class ChallengeService {
    private rest: Rest;
    public challenge: Challenge;
    // private loginDialog: any;
    public challengeSource = new Subject<Challenge>();
    public challange$ = this.challengeSource.asObservable();

    constructor(private http: Http) {
        this.rest = new Rest(http);
        // this.loggedUser$.subscribe(user => {this.user = user;});
        this.challange$.subscribe(challenge => {
            this.challenge = challenge;
        });
    }
    // GET CHELLENGE LIST
    getChallenges(queryArgs?: Object): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.rest.get({
            url: `api/challenges`,
            queryArgs: queryArgs,
            headers: headers
        });
    }
    // GET CHALLENGE
    getChallenge(id: number): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.rest.get({
            url: `api/challenges/${id}`,
            headers: headers
        });
    }
    // CREATE CHALLENGE
    createChallenge(input: any): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
          'Authorization': `Bearer ${token}`,
            'Content-Type': null
        });

        let options = new RequestOptions({ headers: headers });

        // console.log("Challenge " + JSON.stringify(input));
        return this.rest.post({
            url: `api/challenges`,
            body: input,
            headers: headers
        });

        // return this.http
        //     .post("http://localhost:8456/api/challenges", input, options)
        //     .map((res: any) => res.json())
        //     .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    // UPDATE CHALLENGE
    updateChallenge(challenge: any, id: number): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.rest.put({
            url: `api/challenges/${id}`,
            body: challenge,
            headers: headers
        });
    }
    deleteChallenge(id: number): Observable<any[]> {
      var token = this.rest.getToken();
      let headers = new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      return this.rest.delete({
        url: `api/challenges/${id}`,
        headers: headers
      });
    }
    actionChallenge(id: number,action:string): Observable<any[]> {
      var token = this.rest.getToken();
      let headers = new Headers({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      });
      return this.rest.put({
        url: `api/challenges/${id}/${action}`,
        headers: headers
      });
    };
    // UPDATE CHALLENGE IMAGE
    updateChallengeImg(input: any, id: number): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': null
        });
        console.log("Challenge " + JSON.stringify(input));
        return this.rest.post({
            url: `api/challenges/${id}/file`,
            body: input,
            headers: headers
        });

    }

}

export var CHALLENGE_PROVIDER: Array<any> = [
    { provide: ChallengeService, useClass: ChallengeService }
]
