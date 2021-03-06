import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Rest } from './rest';

import { Category } from '../classes/category';
@Injectable()
export class CategoryService {
    private rest: Rest;
    public categories: Category[];
    // private loginDialog: any;
    public categoriesSource = new Subject<Category[]>();
    public categories$ = this.categoriesSource.asObservable();

    constructor(private http: Http) {
        this.rest = new Rest(http);
        this.categories$.subscribe(categories => {this.categories = categories;});
    }
    // GET CHELLENGE LIST
    getCategories(queryArgs?: Object): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.rest.get({
            url: `api/categories`,
            queryArgs: queryArgs,
            headers: headers
        });
    }
    // CREATE CHALLENGE
    createCategory(input: any): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
          'Authorization': `Bearer ${token}`,
            'Content-Type': null
        });
        // console.log("Category " + JSON.stringify(input));
        // return this.rest.post({
        //     url: `api/categories`,
        //     body: category,
        //     headers: headers
        // });

        let options = new RequestOptions({ headers: headers });
        return this.http
            .post("http://localhost:8235/api/categories", input, options)
            .map((res: any) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));;
    }

    // UPDATE CHALLENGE
    updateCategory(category: Category): Observable<any[]> {
        var token = this.rest.getToken();
        let headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        });
        return this.rest.put({
            url: `api/categories`,
            body: category,
            headers: headers
        });
    }
}

export var CATEGORY_PROVIDER: Array<any> = [
    { provide: CategoryService, useClass: CategoryService }
]
