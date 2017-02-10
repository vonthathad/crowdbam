
import { Http, Headers, Request, Response, RequestMethod, RequestOptions, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { QueryOptions } from '../classes/query-options'

import 'rxjs/Rx';

export class Rest {
    // set base url of api backend
    // static BASE_URL: string = '/';
    // static BASE_URL: string = 'http://localhost:8235/';
    static DEFAULT_TOKEN: string = 'CRzytqL1lv1o8FaogFa2S4MyYU4F6Z9D';
    constructor(private http: Http) {
    }

    //////////////////////////////////////////////////
    ////TO SEND REQUEST
    //////////////////////////////////////////////////
    request(options: QueryOptions): Observable<any[]> {
        let base_url = '';
        let location = window.location.href;
        if (location.indexOf('localhost') > -1) {
          base_url = `http://localhost:8456/`;
        } else {
          base_url = `/`;
        }
        // set partial url to full url
        options.url = `${base_url}${options.url}`;
        // stringify body from json to string
        options.body = JSON.stringify(options.body);
        // add default header if there are no header
        if (!options.headers) options.headers = new Headers({ 'Content-Type': 'application/json' });
        // add params to query params
        if (options.queryArgs) {
            // pour object properties to array
            let queryArgsArray: string[] = [];
            Object.keys(options.queryArgs).forEach(function (param) {
                queryArgsArray.push(`${param}=${options.queryArgs[param]}`)
            });
            // connect array componet with '&' then connect with full url
            options.url = `${options.url}?${queryArgsArray.join('&')}`;
        }
        console.log("URL " + options.url);
        // console.log(JSON.stringify(options))
        // create request object
        let reqOptions = new RequestOptions(options);
        var req = new Request(reqOptions);
        // send request and return observable
        return this.http.request(req)
            .map((res: Response) => res.json())
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }

    //////////////////////////////////////////////////
    ////TO POST
    //////////////////////////////////////////////////
    post(options: QueryOptions): Observable<any[]> {
        options.method = RequestMethod.Post;
        return this.request(options);
    }

    //////////////////////////////////////////////////
    ////TO GET
    //////////////////////////////////////////////////
    get(options: QueryOptions): Observable<any[]> {
        options.method = RequestMethod.Get;
        return this.request(options);
    }

    //////////////////////////////////////////////////
    ////TO PUT
    //////////////////////////////////////////////////
    put(options: QueryOptions): Observable<any[]> {
        options.method = RequestMethod.Put;
        return this.request(options);
    }

    //////////////////////////////////////////////////
    ////TO DELETE
    //////////////////////////////////////////////////
    delete(options: QueryOptions): Observable<any[]> {
        options.method = RequestMethod.Delete;
        return this.request(options);
    }

    //////////////////////////////////////////////////
    ////GET TOKEN
    //////////////////////////////////////////////////
    getToken(): string {
        var token = localStorage.getItem("token");
        if (token != "undefined" && token != null) {
            return token;
        } else {
            return Rest.DEFAULT_TOKEN;
        }
    }
}
