import {Injectable} from '@angular/core';
import {Router,CanActivate} from '@angular/router';
import {UserService} from './user.service';

@Injectable()
export class AuthGuardService implements CanActivate{
    constructor(private us: UserService, private router: Router){}
    canActivate(){
        // If user is not logged in, send them to homepage
        if(!this.us.isLoggedIn()){
            this.router.navigate(['']);
            return false;
        } 
        return true;
    }
}


export var AUTH_GUARD_PROVIDER: Array<any> = [
    { provide: AuthGuardService, useClass: AuthGuardService }
]