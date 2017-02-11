import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { overlayConfigFactory } from 'angular2-modal';
import { Modal, BSModalContext } from 'angular2-modal/plugins/bootstrap';

import { Rest } from './rest';

import { User } from '../classes/user';

import { FormLoginWrapperComponent } from '../components-child/form-login-wrapper/form-login-wrapper.component';

@Injectable()
export class UserService {
    private rest: Rest;
    public user: User;
    private loginDialog: any;
    public loggedUserSource = new Subject<User>();
    // public loggedUser$ = this.loggedUserSource.asObservable();

    constructor(private http: Http, private modal: Modal) {
        this.rest = new Rest(http);
        this.loggedUserSource.subscribe(user => {this.user = user;});
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
    isLoggedIn(): boolean {
        if (this.user) return true;
        return false;
    }
    
    setLoginDialog(dialog) {
        this.loginDialog = dialog;
    }
    closeLoginDialog() {
        this.loginDialog.close(true);
        delete this.loginDialog;
    }
    openLoginDialog(){
    this.modal
      .open(FormLoginWrapperComponent, overlayConfigFactory({ num1: 2, num2: 3, isBlocking: false }, BSModalContext))
      .then(dialog => this.setLoginDialog(dialog));
    }
}

export var USER_PROVIDER: Array<any> = [
    { provide: UserService, useClass: UserService }
]
