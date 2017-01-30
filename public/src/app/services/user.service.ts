import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Rest } from './rest';

import { User } from '../classes/user';
@Injectable()
export class UserService {
    private rest: Rest;
    public user: User;
    private userDialog: any;
    public loggedUserSource = new Subject<User>();
    public loggedUser$ = this.loggedUserSource.asObservable();

    constructor(private http: Http) {
        this.rest = new Rest(http);
        this.loggedUser$.subscribe(user => {this.user = user;});
    }
    // register by email, username and password
    register(user): Observable<any[]> {
        return this.rest.post({
            body: user,
            url: `auth/signup`,
        });
    }
    login(user): Observable<any[]> {
        console.log(JSON.stringify(user));
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        return this.rest.post({
            body: user,
            url: `auth/signin`,
            headers: headers
        });
    }
    logout(token) {
        console.log("Token " + token)
        let headers = new Headers({
            'Authorization': `Bearer ${token}`
        });
        return this.rest.get({
            url: `logout`,
            headers: headers
        });
    }
    getUser(token): Observable<any[]> {
        let headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.rest.get({
            url: `api/token`,
            headers: headers
        });
    }
    checkUser(): boolean {
        if (this.user) return true;
        return false;
    }
    
    setUserDialog(dialog) {
        this.userDialog = dialog;
    }
    closeUserDialog() {
        this.userDialog.close(true);
        delete this.userDialog;
    }
}

export var USER_PROVIDER: Array<any> = [
    { provide: UserService, useClass: UserService }
]