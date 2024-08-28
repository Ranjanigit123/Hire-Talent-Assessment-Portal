import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CandidateRegister, EmployerJobs, JobApplication, SkillDetails, User } from '../../models/data.model';
import { PortalDataService } from 'src/app/services/portaldata.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent  implements OnInit{
  loading = false;
  loggedCandidateName='';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  employerjobsDataList:EmployerJobs[] = [];
  candidateRegisDataList:JobApplication[] = [];
  jobsApplicationDataList:JobApplication[] = [];
  candidateSkillsDataList:SkillDetails[] = [];
  selectedJobs: any[] = [];
  employerjobsdetailObj: EmployerJobs=new EmployerJobs();
  employerjobsDialog = false; 
  candidateDialog = false;
  experianceDialog = false;
  public IsCandidate: boolean = false;
  submitted= false; 
  jobApplicationObj: JobApplication=new JobApplication();
  CandiRegis_idRowItem: number;


  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  constructor(private messageService: MessageService,private router: Router,
    private dataService: PortalDataService,private datePipe: DatePipe) 
      {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
        
        if(this.currentUserValue.IsCandidate){
          this.loggedCandidateName = this.currentUserValue.Firstname+' '+this.currentUserValue.Lastname
          this.IsCandidate = true 
        }
        else{
          this.loggedCandidateName = this.currentUserValue.OrganisationName;
          this.IsCandidate = false;
        }
      }

  ngOnInit() {
    if(this.currentUserValue.IsCandidate){
      this.getEmployerJobsByCandidate();
    }
    else
    {
      this.getEmployerJobsByEmployer();
    }

  }
  
  getEmployerJobsByCandidate(){
    
    return new Promise(async(resolve, reject) => { 
      this.dataService.getAllJobapplicationByCandidate(this.currentUserValue.CandidateRegis_id).then(jobAppldatalist => {
        this.jobsApplicationDataList = jobAppldatalist;

          this.dataService.getAllOpeingJobs().then(employerdatalist => {
            this.employerjobsDataList = employerdatalist;
            
              this.dataService.getCandidateSkillsRegis_id(this.currentUserValue.CandidateRegis_id)
              .then(skilldatalist => {
                  this.candidateSkillsDataList = skilldatalist;

                  this.getListofMatchingJos();
              });
          });
      });
    });
    
  } 

 
  getEmployerJobsByEmployer(){
    
    return new Promise(async(resolve, reject) => { 
      this.dataService.getAllJobapplicationByEmployer(this.currentUserValue.EmployerRegis_id).then(jobAppldatalist => {
        this.candidateRegisDataList = jobAppldatalist;

          /*this.dataService.getAllOpeingJobs().then(employerdatalist => {
            this.employerjobsDataList = employerdatalist;
            
              this.dataService.getCandidateSkillsRegis_id(this.currentUserValue.CandidateRegis_id)
              .then(skilldatalist => {
                  this.candidateSkillsDataList = skilldatalist;

                  this.getListofMatchingJos();
              });
          });*/
      });
    });
    
  }  
 
  private getListofMatchingJos() {
    for (let joblist of this.employerjobsDataList) {

      let item = (this.jobsApplicationDataList || []).find(e => 
        e.EmployerJobs_id == joblist.EmployerJobs_id && 
        e.EmployerRegis_id == joblist.EmployerRegis_id &&
        e.CandidateRegis_id == this.currentUserValue.CandidateRegis_id)

        if(item)
          continue;

        for (let candiSkills of this.candidateSkillsDataList) {
          if (joblist.Skill1.trim().length > 0 &&
            candiSkills.TechnicalSkills.trim().length > 0 &&
            candiSkills.TechnicalSkills.toLowerCase().includes(joblist.Skill1.toLowerCase())) {
                this.selectedJobs.push(joblist);
                break;
          }
          if (joblist.Skill2.trim().length > 0 &&
            candiSkills.TechnicalSkills.trim().length > 0 &&
            candiSkills.TechnicalSkills.toLowerCase().includes(joblist.Skill2.toLowerCase())) {
                this.selectedJobs.push(joblist);
                break;
          }
          if (joblist.Skill3.trim().length > 0 &&
            candiSkills.TechnicalSkills.trim().length > 0 &&
            candiSkills.TechnicalSkills.toLowerCase().includes(joblist.Skill3.toLowerCase())) {
                this.selectedJobs.push(joblist);
                break;
          }
          if (joblist.Skill4.trim().length > 0 &&
            candiSkills.TechnicalSkills.trim().length > 0 &&
            candiSkills.TechnicalSkills.toLowerCase().includes(joblist.Skill4.toLowerCase())) {
                this.selectedJobs.push(joblist);
                break;
          }
          if (joblist.Skill5.trim().length > 0 &&
            candiSkills.TechnicalSkills.trim().length > 0 &&
            candiSkills.TechnicalSkills.toLowerCase().includes(joblist.Skill5.toLowerCase())) {
                this.selectedJobs.push(joblist);
                break;
          }
        }
    }
  }

  viewJobDetails(employerjobsRowItem: EmployerJobs, index: number) {
    this.employerjobsDialog = true;
    this.employerjobsdetailObj = {...employerjobsRowItem};
  }

  viewCandidateDetails(employerjobsRowItem: JobApplication, index: number) {
    this.candidateDialog = true;
    var rowItem = {...employerjobsRowItem};
    this.CandiRegis_idRowItem = rowItem.CandidateRegis_id;
  }

  viewExperianceDetails(employerjobsRowItem: JobApplication, index: number) {
    this.experianceDialog = true;
    var rowItem = {...employerjobsRowItem};
    this.CandiRegis_idRowItem = rowItem.CandidateRegis_id;
  }
  

  applyJobApplication() {
    this.submitted = true;

    if (this.employerjobsdetailObj.EmployerJobs_id > 0) {
            this.jobApplicationObj.CandidateRegis_id =  this.currentUserValue.CandidateRegis_id;
            this.jobApplicationObj.EmployerRegis_id =  this.employerjobsdetailObj.EmployerRegis_id;
            this.jobApplicationObj.EmployerJobs_id =  this.employerjobsdetailObj.EmployerJobs_id;
            this.jobApplicationObj.IsCandidate =  this.currentUserValue.IsCandidate;
            const currentDate = new Date();
            this.jobApplicationObj.CandidateApplieddate =  this.datePipe.transform(currentDate, 'yyyy-MM-dd');
            this.jobApplicationObj.EmployerApplieddate =   this.datePipe.transform(currentDate, 'yyyy-MM-dd');
         
            this.dataService.applyJobApplication(this.jobApplicationObj).subscribe(data =>{
                if(data)
                {
                  this.employerjobsDialog = false;
                  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Applied job Successfully', life: 2000});
                  this.selectedJobs = [];
                  this.getEmployerJobsByCandidate();
                }
            });
           
        }
    }


  hideDialog() {
    this.employerjobsDialog = false;
    this.candidateDialog = false;
    this.experianceDialog =false;
    this.employerjobsdetailObj = new EmployerJobs();
  }

    /*  
  getEmployerJobsByEmployer(){
    this.dataService.getAllOpeingJobs()
    .subscribe(datalist => {
      this.employerjobsDataList = datalist;
      this.getCandidateSkillsRegis_id();
  });
  } 

  getCandidateSkillsRegis_id(){
    this.dataService.getCandidateSkillsRegis_id(this.currentUserValue.CandidateRegis_id)
    .subscribe(datalist => {
       this.candidateSkillsDataList = datalist;
        
    });
  }*/
  
}
