import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../models/data.model';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
   

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

 
    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(iscandidate:string, emailid: string, password: string) {
        return this.http.post<any>(`${environment.apiUrl}/apiRouter/login`, { emailid, password, iscandidate})
            .pipe(map(user => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                if(user.Emailid){
                    user.authdata = window.btoa(user.Emailid + ':' + user.pwd + ':' + user.IsCandidate);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    return user;
                }
                else
                {
                    localStorage.removeItem('currentUser');
                    this.currentUserSubject.next(null);
                }
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
 
}

   