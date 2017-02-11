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
            console.log(JSON.stringify(this.challenge));
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
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuaWMuZGhAZ21haWwuY29tIiwiaWF0IjoxNDg1NjczNjk3fQ.-RV4EcP-g2byk9kijsoAJ-NQaMHFiwwkm71XJpNaTto`,
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
        //     .post("/api/challenges", input, options)
        //     .map((res: any) => res.json())
        //     .catch((error: any) => Observable.throw(error || 'Server error'));;
    }

    // UPDATE CHALLENGE
    updateChallenge(challenge: any, id: number): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        console.log(challenge);
        return this.rest.put({
            url: `api/challenges/${id}`,
            body: challenge,
            headers: headers
        });
    }
    // UPDATE CHALLENGE IMAGE
    updateChallengeImg(input: any, id: number): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': null
        });
        // console.log("Challenge " + JSON.stringify(input));
        // return this.rest.post({
        //     url: `api/challenges`,
        //     body: challenge,
        //     headers: headers
        // });

        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(`/api/challenges/${id}/image`, input, options)
            .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));;
    }
}

export var CHALLENGE_PROVIDER: Array<any> = [
    { provide: ChallengeService, useClass: ChallengeService }
]
