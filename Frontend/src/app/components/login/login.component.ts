import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  type: any;
  error = '';

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private dataService: AuthenticationService       
  ) {
      // redirect to home if already logged in
      if (this.dataService.currentUserValue) { 
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          iscandidate: [1, Validators.required],
          emailid: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }
  

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
 
      this.loading = true;
      this.dataService.login(this.f['iscandidate'].value, this.f['emailid'].value, this.f['password'].value)
          .pipe(first())
          .subscribe(
            data => {
                if(data)
                {                    
                   this.router.navigate([this.returnUrl]);                   
                }
                else
                {
                    this.loading = false;
                    this.error = "Invalid emailid/password...";
                }
            },
            error => {
                this.error = error;
                this.loading = false;
            });
  }

  registerCandidate() {  
    if(this.f['iscandidate'].value == 1){
        this.router.navigate(['/registercandidate']);
    }
    else
    {
        this.router.navigate(['/registeremployer']);
    }
  }
}