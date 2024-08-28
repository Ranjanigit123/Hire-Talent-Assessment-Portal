import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { PortalDataService }  from 'src/app/services/portaldata.service';
import { CandidateRegister } from '../../../models/data.model';


@Component({
  selector: 'app-register-candidate',
  templateUrl: './register-candidate.component.html',
  styleUrls: ['./register-candidate.component.scss']
})
export class RegisterCandidateComponent implements OnInit {
  error = '';
  loading = false; 
  regisCandidateForm: FormGroup;
  candidateObj: CandidateRegister=new CandidateRegister();
 
  submitted = false;
  returnUrl: any;
  
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: PortalDataService     
) {
    // redirect to home if already logged in
    // if (this.dataService.currentUserValue) { 
    //     this.router.navigate(['/']);
    // }
}

  ngOnInit() {
    this.regisCandidateForm = this.formBuilder.group({
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        dob: ['', [
          Validators.required,
          // validates date format yyyy-mm-dd with regular expression
          Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
          ]],  
          address: ['', Validators.required],
          city: ['', Validators.required],
          emaild: ['', Validators.required],
          password: ['', Validators.required],
          confirmpassword: ['', Validators.required],
          contactnumber: ['', Validators.required],
          state: ['', Validators.required],
          pincode: ['', Validators.required],
          country: ['', Validators.required],
          watsupnumber: ['', Validators.required]         

    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
 }
  // convenience getter for easy access to form fields
  get f() { return this.regisCandidateForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.regisCandidateForm.invalid) {
        return;
    }

    this.candidateObj.Firstname = this.f['firstname'].value;
    this.candidateObj.Lastname =this.f['lastname'].value;
    this.candidateObj.Emailid =this.f['emaild'].value;
    this.candidateObj.password =this.f['password'].value;
    this.candidateObj.DOB =this.f['dob'].value;
    this.candidateObj.Contactnumber =this.f['contactnumber'].value;
    this.candidateObj.ContactAddress =this.f['address'].value;
    this.candidateObj.City =this.f['city'].value;
    this.candidateObj.State =this.f['state'].value;
    this.candidateObj.Pincode =this.f['pincode'].value;
    this.candidateObj.Country =this.f['country'].value;
    this.candidateObj.Whatsupnumber =this.f['watsupnumber'].value;
    this.candidateObj.IsCandidate = 1;

    this.loading = true;
     this.dataService.registerCandidate(this.candidateObj)
          .pipe(first())
          .subscribe(
          data => {
              if(data)
              {
                this.loginScreen();
              }
              this.loading = false;
            },
            error => {
               this.error = error;
               this.loading = false;
           }); 
  
  }

  loginScreen() {
    this.router.navigate(['/login']);
  }
}
