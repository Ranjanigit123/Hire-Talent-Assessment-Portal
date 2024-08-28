import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { PortalDataService }  from 'src/app/services/portaldata.service';
import {  EmployerRegister } from '../../../models/data.model';


@Component({
  selector: 'app-register-employer',
  templateUrl: './register-employer.component.html',
  styleUrls: ['./register-employer.component.scss']
})
export class RegisterEmployerComponent implements OnInit {
  error = '';
  loading = false; 
  regisEmployerForm: FormGroup;
  employerObj: EmployerRegister=new EmployerRegister();
 
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
    this.regisEmployerForm = this.formBuilder.group({
          organisationname: ['', Validators.required],
          businesssector: ['', Validators.required],
          emaild: ['', Validators.required],
          password: ['', Validators.required],
          confirmpassword: ['', Validators.required],
          website: ['', Validators.required],
          commencementdate: ['', [
              Validators.required,
              // validates date format yyyy-mm-dd with regular expression
              Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
          ]],  
          contactnumber: ['', Validators.required],
          contactaddress: ['', Validators.required],
          city: ['', Validators.required],
          state: ['', Validators.required],
          pincode: ['', Validators.required],
          country: ['', Validators.required],
          sizeofemp: ['', Validators.required],
          cerificate1: ['', Validators.required],      
          cerificate2: ['', Validators.required],  
          cerificate3: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    
 }
  // convenience getter for easy access to form fields
  get f() { return this.regisEmployerForm.controls; }

  onSubmit() {
    this.submitted = true;

      // stop here if form is invalid
      if (this.regisEmployerForm.invalid) {
          return;
      }

      this.employerObj.OrganisationName = this.f['organisationname'].value;
      this.employerObj.BusinessSector = this.f['businesssector'].value;
      this.employerObj.Cerificate1 = this.f['cerificate1'].value;
      this.employerObj.Cerificate2 = this.f['cerificate2'].value;
      this.employerObj.Cerificate3 = this.f['cerificate3'].value;
      this.employerObj.Website = this.f['website'].value;
      this.employerObj.Emailid = this.f['emaild'].value;
      this.employerObj.Password = this.f['password'].value;
      this.employerObj.CommencementDate = this.f['commencementdate'].value;
      this.employerObj.ContactAddress = this.f['contactaddress'].value;
      this.employerObj.City = this.f['city'].value;
      this.employerObj.State = this.f['state'].value;
      this.employerObj.Pincode = this.f['pincode'].value;
      this.employerObj.Country = this.f['country'].value;
      this.employerObj.Contactnumber = this.f['contactnumber'].value;
      this.employerObj.SizeofEmp = this.f['sizeofemp'].value;
      this.employerObj.IsCandidate = 0;

      this.loading = true;
      this.dataService.registerEmployer(this.employerObj)
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
