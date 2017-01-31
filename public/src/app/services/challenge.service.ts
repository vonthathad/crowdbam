import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Rest } from './rest';

import { Challenge } from '../classes/challenge';
@Injectable()
export class ChallengeService {
    private rest: Rest;
    // private loginDialog: any;
    // public loggedUserSource = new Subject<User>();
    // public loggedUser$ = this.loggedUserSource.asObservable();

    constructor(private http: Http) {
        this.rest = new Rest(http);
        // this.loggedUser$.subscribe(user => {this.user = user;});
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
    // CREATE CHALLENGE
    createChallenge(challenge: Challenge, input): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuaWMuZGhAZ21haWwuY29tIiwiaWF0IjoxNDg1NjczNjk3fQ.-RV4EcP-g2byk9kijsoAJ-NQaMHFiwwkm71XJpNaTto`,
            'Content-Type': 'multipart/form-data'
        });
        console.log("Challenge " + JSON.stringify(challenge));
        // return this.rest.post({
        //     url: `api/challenges`,
        //     body: challenge,
        //     headers: headers
        // });

        let options = new RequestOptions({ headers: headers });
        return this.http
            .post("http://localhost:8235/api/challenges", input, options)
            .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));;
    }

    // UPDATE CHALLENGE
    updateChallenge(challenge: Challenge): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        });
        return this.rest.put({
            url: `api/challenges`,
            body: challenge,
            headers: headers
        });
    }
}

export var CHALLENGE_PROVIDER: Array<any> = [
    { provide: ChallengeService, useClass: ChallengeService }
]