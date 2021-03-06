import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Rest } from './rest';

import { Type } from '../classes/type';
@Injectable()
export class TypeService {
    private rest: Rest;
    private type: Type;
    public types: Type[];
    // private loginDialog: any;
    public typeSource = new Subject<string>();
    public type$ = this.typeSource.asObservable();
    public typesSource = new Subject<Type[]>();
    public types$ = this.typesSource.asObservable();

    constructor(private http: Http) {
        this.rest = new Rest(http);
        this.type$.subscribe(type => {this.type = type;});
        this.types$.subscribe(types => {this.types = types;});
    }
    // GET CHELLENGE LIST
    getTypes(queryArgs?: Object): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Type-Type': 'application/json'
        });
        return this.rest.get({
            url: `api/types`,
            queryArgs: queryArgs,
            headers: headers
        });
    }
    // GET TYPE
    getType(id: number): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Type-Type': 'application/json'
        });
        return this.rest.get({
            url: `api/types/${id}`,
            headers: headers
        });
    }
    // CREATE TYPE
    createType(input: any): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
          'Authorization': `Bearer ${token}`,
            'Type-Type': null
        });
        // console.log("Type " + JSON.stringify(input));
        // return this.rest.post({
        //     url: `api/types`,
        //     body: type,
        //     headers: headers
        // });

        let options = new RequestOptions({ headers: headers });
        return this.http
            .post("http://localhost:8235/api/types", input, options)
            .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));;
    }

    // UPDATE TYPE
    updateType(type: Type, id: number): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
          'Authorization': `Bearer ${token}`,
            'Type-Type': 'application/json'
        });
        console.log(type);
        return this.rest.put({
            url: `api/types/${id}`,
            body: type,
            headers: headers
        });
    }

      // UPDATE TYPE
    deleteType(id: number): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
          'Authorization': `Bearer ${token}`,
            'Type-Type': 'application/json'
        });
        return this.rest.delete({
            url: `api/types/${id}`,
            headers: headers
        });
    }
}

export var TYPE_PROVIDER: Array<any> = [
    { provide: TypeService, useClass: TypeService }
]
