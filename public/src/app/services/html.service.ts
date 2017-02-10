import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Rest } from './rest';

@Injectable()
export class HtmlService {
    private rest: Rest;
    public htmls: {type:string,html:string}[];
    // private loginDialog: any;
    public htmlsSource = new Subject<{type:string,html:string}[]>();
    public htmls$ = this.htmlsSource.asObservable();

    constructor() {
        this.htmls$.subscribe(htmls => {
            this.htmls = htmls;
        });
    }
}

export var HTML_PROVIDER: Array<any> = [
    { provide: HtmlService, useClass: HtmlService }
]