import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { PrimeNGConfig } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { ExperienceDetails, User } from 'src/app/models/data.model';
import { ConfirmationService } from 'primeng/api';
import { BehaviorSubject, first, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PortalDataService } from 'src/app/services/portaldata.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-candidate-experiance',
  templateUrl: './candidate-experiance.component.html',
  styleUrls: ['./candidate-experiance.component.scss'],
  providers: [DatePipe]
})
export class CandidateExperianceComponent {
  @Input() isfromemployer: boolean;
  @Input() CandiRegis_idfromemployer: number;
  experianceDataList:ExperienceDetails[] = [];
  @ViewChild('experianceTable') experianceTable: Table;
  experianceDialog = false; 
  editing=true;
  isdelete = false;
  submitted= false; 
  candiRegis_id:number;
  experiancedetailObj: ExperienceDetails=new ExperienceDetails();
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private messageService: MessageService,private http: HttpClient,
    private dataService: PortalDataService,private datePipe: DatePipe) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

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
  this.dataService.getExperianceByCandidateRegis_id(this.candiRegis_id)
  .subscribe(datalist => {
     this.experianceDataList = datalist;
});
}

 
public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

  openNew() {
    this.experianceDialog = true;
    this.isdelete=false;
  }

  hideDialog() {
    this.experianceDialog = false;
    this.submitted = false;
    this.experiancedetailObj = new ExperienceDetails();
  }

  saveExperianceDetails() {
    this.submitted = true;

    if (this.experiancedetailObj.CompanyName.trim()) {
        if (this.experiancedetailObj.ExperienceDet_id) {
          if(!this.isdelete){
                this.dataService.updateExperianceDetails(this.experiancedetailObj).subscribe(data =>{
                  if(data)
                  {
                    this.messageService.add({severity:'success', summary: 'Successful', detail: 'Experiance detail Updated', life: 2000});
                    this.experianceDialog = false;
                    this.experiancedetailObj = new ExperienceDetails();
                    this.bindGrid();
                  }
              });
          }
          else
          {
              this.dataService.deleteExperianceDetails(this.experiancedetailObj).subscribe(data =>{
                if(data)
                {
                  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Experiance detail deleted', life: 2000});
                  this.experianceDialog = false;
                  this.experiancedetailObj = new ExperienceDetails();
                  this.bindGrid();
                }
             });
          }            
        }
        else {
            this.experiancedetailObj.CandidateRegis_id = this.candiRegis_id;
            this.dataService.addExperianceDetails(this.experiancedetailObj).subscribe(data =>{
                if(data)
                {
                  this.messageService.add({severity:'success', summary: 'Successful', detail: 'Experiance detail Created', life: 2000});
                  this.experiancedetailObj.ExperienceDet_id = data.expdetailID;
                  this.experianceDataList.push(this.experiancedetailObj);
                  this.experianceDataList = [...this.experianceDataList];
                  this.experianceDialog = false;
                  this.experiancedetailObj = new ExperienceDetails();
                }
            });
           
        }
    }
}



findIndexById(id: number): number {
  let index = -1;
  for (let i = 0; i < this.experianceDataList.length; i++) {
      if (this.experianceDataList[i].ExperienceDet_id === id) {
          index = i;
          break;
      }
  }

  return index;
}

onRowEditInit(experianceRowItem: ExperienceDetails, index: number) {
  this.experianceTable.editingRowKeys = {[experianceRowItem.ExperienceDet_id]:true}
  this.experiancedetailObj = {...experianceRowItem};
  this.experiancedetailObj.StartDate = this.datePipe.transform(this.experiancedetailObj.StartDate, 'yyyy-MM-dd');
  this.experiancedetailObj.EndDate = this.datePipe.transform(this.experiancedetailObj.EndDate, 'yyyy-MM-dd');
  this.isdelete=false;
  this.experianceDialog = true;
}

onRowEditSave(experianceRowItem: ExperienceDetails, index: number) {
  console.log('Edit Save Event Called');
 
}

onRowEditCancel(experianceRowItem: ExperienceDetails, index: number) {
  this.experianceTable.editingRowKeys = {[experianceRowItem.ExperienceDet_id]:true}
  this.experiancedetailObj = {...experianceRowItem};
  this.experiancedetailObj.StartDate = this.datePipe.transform(this.experiancedetailObj.StartDate, 'yyyy-MM-dd');
  this.experiancedetailObj.EndDate = this.datePipe.transform(this.experiancedetailObj.EndDate, 'yyyy-MM-dd');
  this.isdelete=true;
  this.experianceDialog = true;
}



}
