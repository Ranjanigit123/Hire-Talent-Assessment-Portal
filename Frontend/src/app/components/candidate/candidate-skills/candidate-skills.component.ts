import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ReactiveFormsModule } from '@angular/forms';
import { PortalDataService }  from 'src/app/services/portaldata.service';
import { SkillDetails } from '../../../models/data.model';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import {HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExperienceDetails, User } from 'src/app/models/data.model';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-candidate-skills',
  templateUrl: './candidate-skills.component.html',
  styleUrls: ['./candidate-skills.component.scss']
})
export class CandidateSkillsComponent implements OnInit {
  @Input() isfromemployer: boolean;
  @Input() CandiRegis_idfromemployer: number;
  error = '';
  loading = false; 
  candidateSkillForm: FormGroup;
  submitted = false;
  returnUrl: any;
  percentDone: number;
  candiRegis_id:number;
  uploadSuccess: boolean = false;

  candidateSkillsDataList:SkillDetails[] = [];
  @ViewChild('candidateSkillsTable') candidateSkillsTable: Table;
  candidateSkillsDialog = false; 
  editing=true;
  isdelete=false;
  candidateSkillsdetailObj: SkillDetails=new SkillDetails();
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
 
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  constructor(private messageService: MessageService,private http: HttpClient,
    private dataService: PortalDataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  // convenience getter for easy access to form fields
  //get f() { return this.candidateSkillForm.controls; }

  ngOnInit() {
    
    if(!this.isfromemployer){
      this.candiRegis_id = this.currentUserValue.CandidateRegis_id
    }
    else{
      this.candiRegis_id = this.CandiRegis_idfromemployer;
    }
    this.bindGrid();
  }

bindGrid(){
  this.dataService.getCandidateSkillsRegis_id(this.candiRegis_id)
  .then(datalist => {
     this.candidateSkillsDataList = datalist;

  });
}


openNew() {
  this.candidateSkillsDialog = true;
  this.isdelete=false;
}

hideDialog() {
  this.candidateSkillsDialog = false;
  this.submitted = false;
  this.candidateSkillsdetailObj = new SkillDetails();
}

onRowEditInit(candidateSkillsRowItem: SkillDetails, index: number) {
  this.candidateSkillsTable.editingRowKeys = {[candidateSkillsRowItem.SkillDetails_id]:true}
  this.candidateSkillsdetailObj = {...candidateSkillsRowItem};
  this.candidateSkillsdetailObj.YearofPassout = this.datePipe.transform(this.candidateSkillsdetailObj.YearofPassout, 'yyyy-MM-dd');
  this.isdelete=false;
  this.candidateSkillsDialog = true;
}

onRowEditSave(candidateSkillsRowItem: SkillDetails, index: number) {
  console.log('Edit Save Event Called');
}

onRowEditCancel(candidateSkillsRowItem: SkillDetails, index: number) {
  this.candidateSkillsTable.editingRowKeys = {[candidateSkillsRowItem.SkillDetails_id]:true}
  this.candidateSkillsdetailObj = {...candidateSkillsRowItem};
  this.candidateSkillsdetailObj.YearofPassout = this.datePipe.transform(this.candidateSkillsdetailObj.YearofPassout, 'yyyy-MM-dd');
  this.isdelete=true;
  this.candidateSkillsDialog = true;
}

saveSkillDetails() {
  this.submitted = true;

  if (this.candidateSkillsdetailObj.HighestDegree.trim()) {
      if (this.candidateSkillsdetailObj.SkillDetails_id) {
        if(!this.isdelete){
              this.dataService.updateSkillDetails(this.candidateSkillsdetailObj).subscribe(data =>{
                if(data)
                {
                  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Candidate detail Updated', life: 2000});
                  this.candidateSkillsDialog = false;
                  this.candidateSkillsdetailObj = new SkillDetails();
                  this.bindGrid();
                }
            });
        }
        else
        {
          this.dataService.deleteSkillDetails(this.candidateSkillsdetailObj).subscribe(data =>{
            if(data)
            {
              this.messageService.add({severity:'success', summary: 'Successful', detail: 'Candidate detail Deleted', life: 2000});
              this.candidateSkillsDialog = false;
              this.candidateSkillsdetailObj = new SkillDetails();
              this.bindGrid();
            }
        });
        }
      }
      else {
          this.candidateSkillsdetailObj.CandidateRegis_id = this.candiRegis_id;
          this.dataService.addSkillDetails(this.candidateSkillsdetailObj).subscribe(data =>{
              if(data)
              {
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Candidate detail Created', life: 2000});
                this.candidateSkillsdetailObj.SkillDetails_id = data.skilldetailID;
                this.candidateSkillsDataList.push(this.candidateSkillsdetailObj);
                this.candidateSkillsDataList = [...this.candidateSkillsDataList];
                this.candidateSkillsDialog = false;
                this.candidateSkillsdetailObj = new SkillDetails();
              }
          });
         
      }
  }
}


/*
  ngOnInit() {

    this.candidateSkillForm = this.formBuilder.group({
      highestdegree: ['', Validators.required],
      university: ['', Validators.required],
      institutename: ['', Validators.required],
      yearofpassout: ['', [
          Validators.required,
          // validates date format yyyy-mm-dd with regular expression
          Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)
          ]],  
          technicalskills: ['', Validators.required],
          cerification: ['', Validators.required],
          resume: ['', Validators.required],
    });
    
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
}


  onSubmit() {
  this.submitted = true;
  // stop here if form is invalid
  if (this.candidateSkillForm.invalid) {
        return;
    }

    this.skillDetailObj.HighestDegree = this.f['highestdegree'].value;
    this.skillDetailObj.University_Board = this.f['university'].value;
    this.skillDetailObj.InstituteName = this.f['institutename'].value;
    this.skillDetailObj.YearofPassout = this.f['yearofpassout'].value;
    this.skillDetailObj.TechnicalSkills = this.f['highestdegree'].value;
    this.skillDetailObj.Resume_filename = this.f['resume'].value;
    this.skillDetailObj.Cerification = this.f['cerification'].value;
    this.skillDetailObj.CandidateRegis_id = 2;

    this.loading = true;
   
    this.dataService.addSkillDetails(this.skillDetailObj)
    .pipe(first())
    .subscribe(
    data => {
        if(data)
        {
             this.router.navigate([this.returnUrl]);
        }
        this.loading = false;
      },
      (      error: string) => {
         this.error = error;
         this.loading = false;
     }); 

  }

  upload(files: File[]){
    //pick from one of the 4 styles of file uploads below
    this.uploadSuccess = false;
    this.uploadAndProgress(files);
   // this.uploadAndProgressSingle(files[0]);
    //this.basicUpload(files);
  }
 
  uploadAndProgress(files: File[]){
    console.log(files)
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file',f))
    
    //this.http.post('https://file.io', formData, {reportProgress: true, observe: 'events'})
     this.http.post(`${environment.apiUrl}/apirouter/candidate/uploadresume`, formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        //  if (event.type === HttpEventType.UploadProgress) {
        //   this.percentDone = Math.round(100 * event.loaded / event.total);
        // } else if (event instanceof HttpResponse) {
        //   this.uploadSuccess = true;
        // }
    }); 

     


  }

  basicUpload(files: File[]){
    var formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f))
    this.http.post('https://file.io', formData)
      .subscribe(event => {  
        console.log('done')
      })
  }
  
  //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  basicUploadSingle(file: File){    
    this.http.post('https://file.io', file)
      .subscribe(event => {  
        console.log('done')
      })
  }

    //this will fail since file.io dosen't accept this type of upload
  //but it is still possible to upload a file with this style
  uploadAndProgressSingle(file: File){    
    this.http.post('https://file.io', file, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
    });
  }
*/

}
