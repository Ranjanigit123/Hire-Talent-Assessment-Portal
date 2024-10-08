import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private dataService: AuthenticationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const currentUser = this.dataService.currentUserValue;
        if (currentUser) {
            request = request.clone({
                // setHeaders: { 
                //     Authorization: `Basic ${currentUser.authdata}`
                // }
            });
        }

        return next.handle(request);
    }
}