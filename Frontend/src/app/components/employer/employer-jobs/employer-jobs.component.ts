import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { EmployerJobs, ExperienceDetails, User } from 'src/app/models/data.model';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PortalDataService } from 'src/app/services/portaldata.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-employer-jobs',
  templateUrl: './employer-jobs.component.html',
  styleUrls: ['./employer-jobs.component.scss']
})
export class EmployerJobsComponent implements OnInit {
  employerjobsDataList:EmployerJobs[] = [];
  @ViewChild('employerjobsTable') employerjobsTable: Table;
  employerjobsDialog = false; 
  editing=true;
  isdelete = false;
  submitted= false; 
  employerjobsdetailObj: EmployerJobs=new EmployerJobs();
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
 
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  constructor(private messageService: MessageService,private http: HttpClient,
    private dataService: PortalDataService,private datePipe: DatePipe) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
 
  ngOnInit() {
      this.bindGrid();
  }

    
  bindGrid(){
    this.dataService.getEmployerJobsByEmployerRegis_id(this.currentUserValue.EmployerRegis_id)
    .subscribe(datalist => {
      this.employerjobsDataList = datalist;
  });
  } 

  hideDialog() {
    this.employerjobsDialog = false;
    this.submitted = false;
    this.employerjobsdetailObj = new EmployerJobs();
  }
  
  openNew() {
    this.employerjobsDialog = true;
    this.isdelete=false;
  }

  
  saveEmployerJobsDetails() {
    this.submitted = true;

    if (this.employerjobsdetailObj.JobTitle.trim()) {
        if (this.employerjobsdetailObj.EmployerJobs_id) {
          if(!this.isdelete){
              this.dataService.updateEmployerJobsDetails(this.employerjobsdetailObj).subscribe(data =>{
                  if(data)
                  {
                    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Employer Job Updated', life: 2000});
                    this.employerjobsDialog = false;
                    this.employerjobsdetailObj = new EmployerJobs();
                    this.bindGrid();
                  }
              }); 
          }
          else
          {
               this.dataService.deleteEmployerJobsDetails(this.employerjobsdetailObj).subscribe(data =>{
                if(data)
                {
                  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Employer Job deleted', life: 2000});
                  this.employerjobsDialog = false;
                  this.employerjobsdetailObj = new EmployerJobs();
                  this.bindGrid();
                }
             });  
          }            
        }
        else {
            this.employerjobsdetailObj.EmployerRegis_id = this.currentUserValue.EmployerRegis_id;
            this.dataService.addEmployerJobsDetails(this.employerjobsdetailObj).subscribe(data =>{
                if(data)
                {
                  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Employer Job Created', life: 2000});
                  this.employerjobsdetailObj.EmployerJobs_id = data.employerJobsID;
                  this.employerjobsDataList.push(this.employerjobsdetailObj);
                  this.employerjobsDataList = [...this.employerjobsDataList];
                  this.employerjobsDialog = false;
                  this.employerjobsdetailObj = new EmployerJobs();
                }
            });
           
        }
    }
}


onRowEditInit(employerjobsRowItem: EmployerJobs, index: number) {
  this.employerjobsTable.editingRowKeys = {[employerjobsRowItem.EmployerJobs_id]:true}
  this.employerjobsdetailObj = {...employerjobsRowItem};
  this.isdelete=false;
  this.employerjobsDialog = true;
}

onRowEditSave(experianceRowItem: EmployerJobs, index: number) {
  console.log('Edit Save Event Called');
 
}

onRowEditCancel(employerjobsRowItem: EmployerJobs, index: number) {
  this.employerjobsTable.editingRowKeys = {[employerjobsRowItem.EmployerJobs_id]:true}
  this.employerjobsdetailObj = {...employerjobsRowItem};
  this.isdelete=true;
  this.employerjobsDialog = true;
}

}
