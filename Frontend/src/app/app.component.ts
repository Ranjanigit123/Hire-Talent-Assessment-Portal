import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services/authentication.service';
import { User } from './models/data.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
    currentUser: User=new User();
    public IsCandidate: boolean = false;
    
constructor(private router: Router, private dataService: AuthenticationService) 
      {
        this.dataService.currentUser.subscribe(x => {
            this.currentUser = x
            if(this.currentUser)
              this.IsCandidate = this.currentUser.IsCandidate ? true : false;
        });
      }     
  
    logout() {
        this.dataService.logout();
        this.router.navigate(['/login']);
    }
}