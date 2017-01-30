import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

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
    getChallenges(){
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.rest.get({
            url: `api/challenges`,
            headers: headers
        });
    }
}

export var CHALLENGE_PROVIDER: Array<any> = [
    { provide: ChallengeService, useClass: ChallengeService }
]