import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Rest } from './rest';

import { Content } from '../classes/content';
@Injectable()
export class ContentService {
    private rest: Rest;
    private content: Content;
    // private loginDialog: any;
    // public loggedUserSource = new Subject<User>();
    // public loggedUser$ = this.loggedUserSource.asObservable();

    constructor(private http: Http) {
        this.rest = new Rest(http);
        // this.loggedUser$.subscribe(user => {this.user = user;});
    }
    // GET CHELLENGE LIST
    getContents(queryArgs?: Object): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.rest.get({
            url: `api/contents`,
            queryArgs: queryArgs,
            headers: headers
        });
    }
    // GET CONTENT 
    getContent(input: any): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.rest.get({
            url: `api/contents/${input.id}/${input.type}`,
            headers: headers
        });
    }
    // CREATE CONTENT
    createContent(input: any): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuaWMuZGhAZ21haWwuY29tIiwiaWF0IjoxNDg1NjczNjk3fQ.-RV4EcP-g2byk9kijsoAJ-NQaMHFiwwkm71XJpNaTto`,
            'Content-Type': 'application/json'
        });
        return this.rest.post({
            url: `api/contents/${input.id}/${input.type}`,
            body: input.data,
            headers: headers
        });

    }

    // UPDATE CONTENT
    updateContent(input: any): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuaWMuZGhAZ21haWwuY29tIiwiaWF0IjoxNDg1NjczNjk3fQ.-RV4EcP-g2byk9kijsoAJ-NQaMHFiwwkm71XJpNaTto`,
            'Content-Type': 'application/json'
        });
        return this.rest.put({
            url: `api/contents/${input.id}/${input.type}`,
            body: input.data,
            headers: headers
        });
    }

    // DELETE CONTENT
    deleteContent(input: any): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFuaWMuZGhAZ21haWwuY29tIiwiaWF0IjoxNDg1NjczNjk3fQ.-RV4EcP-g2byk9kijsoAJ-NQaMHFiwwkm71XJpNaTto`,
            'Content-Type': 'application/json'
        });
        return this.rest.delete({
            url: `api/contents/${input.id}/${input.type}`,
            headers: headers
        });
    }
}

export var CONTENT_PROVIDER: Array<any> = [
    { provide: ContentService, useClass: ContentService }
]