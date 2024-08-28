import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import { environment } from '../../environments/environment';
import { User, CandidateRegister, SkillDetails, ExperienceDetails, EmployerRegister, EmployerJobs, JobApplication  } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})

export class PortalDataService {
private currentUserSubject: BehaviorSubject<User>;
public currentUser: Observable<User>;
candidateObj: CandidateRegister=new CandidateRegister();
skillDetailObj: SkillDetails=new SkillDetails();
experianceDetailObj: ExperienceDetails=new ExperienceDetails();

userObj: User=new User();

  constructor(private http:HttpClient) { }

    registerCandidate(candidateObj: CandidateRegister) {
        
    let jsonObject =  
    {
        "Firstname": candidateObj.Firstname ,
        "Lastname": candidateObj.Lastname ,
        "DOB": candidateObj.DOB ,
        "Emailid": candidateObj.Emailid ,
        "ContactAddress": candidateObj.ContactAddress ,
        "City": candidateObj.City ,
        "State": candidateObj.State ,
        "Pincode": candidateObj.Pincode ,
        "Country": candidateObj.Country ,        
        "Contactnumber": candidateObj.Contactnumber ,
        "Whatsupnumber": candidateObj.Whatsupnumber ,
        "password": candidateObj.password,
        "LastloginDate": candidateObj.LastloginDate,
        "IsCandidate": candidateObj.IsCandidate      
    }

    const httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    };

    return this.http.post<any>(`${environment.apiUrl}/apiRouter/registerCandidate`, jsonObject,httpOptions)
        .pipe(map(data => {
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            if(data){
                return data;
            }
            else
            {
                return data;
            }
        }));
    }

    

    addSkillDetails(skillDetailObj: SkillDetails) {

        let jsonObject =  
        {
            "CandidateRegis_id": skillDetailObj.CandidateRegis_id,
            "HighestDegree": skillDetailObj.HighestDegree,
            "University_Board": skillDetailObj.University_Board,
            "InstituteName": skillDetailObj.InstituteName,
            "YearofPassout": skillDetailObj.YearofPassout,
            "TechnicalSkills": skillDetailObj.TechnicalSkills,
            "Cerification": skillDetailObj.Cerification,
            "Percenatage": skillDetailObj.Percentage
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

    return this.http.post<any>(`${environment.apiUrl}/apiRouter/candidate/addskilldetails`, jsonObject,httpOptions)
        .pipe(map(data => {
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            if(data){
                return data;
            }
            else
            {
                return data;
            }
        }));

    }

    updateSkillDetails(skillDetailObj: SkillDetails):Observable<any>{

        let jsonObject =  
        {
            "SkillDetails_id": skillDetailObj.SkillDetails_id,
            "HighestDegree": skillDetailObj.HighestDegree,
            "University_Board": skillDetailObj.University_Board,
            "InstituteName": skillDetailObj.InstituteName,
            "YearofPassout": skillDetailObj.YearofPassout,
            "TechnicalSkills": skillDetailObj.TechnicalSkills,
            "Cerification": skillDetailObj.Cerification,
            "Percentage": skillDetailObj.Percentage
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

       return this.http.put<any>(`${environment.apiUrl}/apiRouter/candidate/skillrecord/`+skillDetailObj.SkillDetails_id, jsonObject,httpOptions)
        .pipe(map(data => {
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            if(data){
                return data;
            }
            else
            {
                return data;
            }
        }));

    }

/*
    getCandidateSkillsRegis_id(CandidateRegis_id:any) {
        return this.http.get<SkillDetails[]>(`${environment.apiUrl}/apiRouter/candidate/skilldetails/` + CandidateRegis_id);
    }*/

    getCandidateSkillsRegis_id(CandidateRegis_id:any) {
        return new Promise<SkillDetails[]>((resolve, reject) => {
            this.http.get<SkillDetails[]>(`${environment.apiUrl}/apiRouter/candidate/skilldetails/` + CandidateRegis_id)
            .subscribe(res => resolve(res));
        });
    }


    deleteSkillDetails(skillDetailObj: SkillDetails):Observable<any>{

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

       return this.http.delete<any>(`${environment.apiUrl}/apiRouter/candidate/skillrecord/`+skillDetailObj.SkillDetails_id,httpOptions)
        .pipe(map(data => {
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            if(data){
                return data;
            }
            else
            {
                return data;
            }
        }));

    }



    addExperianceDetails(experianceDetailObj: ExperienceDetails):Observable<any>{

        let jsonObject =  
        {
            "CandidateRegis_id": experianceDetailObj.CandidateRegis_id,
            "CompanyName": experianceDetailObj.CompanyName,
            "CompanyAddress": experianceDetailObj.CompanyAddress,
            "Designation": experianceDetailObj.Designation,
            "StartDate": experianceDetailObj.StartDate,
            "EndDate": experianceDetailObj.EndDate,
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

    return this.http.post<any>(`${environment.apiUrl}/apiRouter/candidate/addexperiencedetail`, jsonObject,httpOptions)
        .pipe(map(data => {
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            if(data){
                return data;
            }
            else
            {
                return data;
            }
        }));

    }

    getExperianceByCandidateRegis_id(CandidateRegis_id:any) {
        return this.http.get<ExperienceDetails[]>(`${environment.apiUrl}/apiRouter/candidate/experiencedetails/` + CandidateRegis_id);
    }
    
    updateExperianceDetails(experianceDetailObj: ExperienceDetails):Observable<any>{

        let jsonObject =  
        {
            "experienceDetid": experianceDetailObj.ExperienceDet_id,
            "CompanyName": experianceDetailObj.CompanyName,
            "CompanyAddress": experianceDetailObj.CompanyAddress,
            "Designation": experianceDetailObj.Designation,
            "StartDate": experianceDetailObj.StartDate,
            "EndDate": experianceDetailObj.EndDate,
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

       return this.http.put<any>(`${environment.apiUrl}/apiRouter/candidate/experiencerecord/`+experianceDetailObj.ExperienceDet_id, jsonObject,httpOptions)
        .pipe(map(data => {
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            if(data){
                return data;
            }
            else
            {
                return data;
            }
        }));

    }

    deleteExperianceDetails(experianceDetailObj: ExperienceDetails):Observable<any>{

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

       return this.http.delete<any>(`${environment.apiUrl}/apiRouter/candidate/experiencerecord/`+experianceDetailObj.ExperienceDet_id,httpOptions)
        .pipe(map(data => {
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            if(data){
                return data;
            }
            else
            {
                return data;
            }
        }));

    }



    registerEmployer(employerObj: EmployerRegister) {
        
        let jsonObject =  
        {
            "OrganisationName":employerObj.OrganisationName,
            "BusinessSector": employerObj.BusinessSector,
            "Cerificate1": employerObj.Cerificate1,
            "Cerificate2": employerObj.Cerificate2,
            "Cerificate3": employerObj.Cerificate3,
            "Website": employerObj.Website,
            "Emailid": employerObj.Emailid,
            "Password": employerObj.Password,
            "CommencementDate": employerObj.CommencementDate,
            "ContactAddress": employerObj.ContactAddress,
            "City": employerObj.City,
            "State": employerObj.State,
            "Pincode": employerObj.Pincode,
            "Country": employerObj.Country,
            "Contactnumber": employerObj.Contactnumber,
            "SizeofEmp": employerObj.SizeofEmp,
            "IsCandidate": 0
        }
    
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
    
        return this.http.post<any>(`${environment.apiUrl}/apiRouter/registerEmployer`, jsonObject,httpOptions)
            .pipe(map(data => {
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                if(data){
                    return data;
                }
                else
                {
                    return data;
                }
            }));
    }

    getEmployerJobsByEmployerRegis_id(EmployerRegis_id:any) {
        return this.http.get<EmployerJobs[]>(`${environment.apiUrl}/apiRouter/employer/employerjobs/` + EmployerRegis_id);
    }
    
    addEmployerJobsDetails(employerjobsDetailObj: EmployerJobs):Observable<any>{

        let jsonObject =  
        {
            "EmployerRegis_id":employerjobsDetailObj.EmployerRegis_id,
            "JobTitle":employerjobsDetailObj.JobTitle,
            "City":employerjobsDetailObj.City,
            "State":employerjobsDetailObj.State,
            "Country":employerjobsDetailObj.Country,
            "willRelocate":employerjobsDetailObj.willRelocate,
            "willTravel":employerjobsDetailObj.willTravel,
            "FulltimeSalary":employerjobsDetailObj.FulltimeSalary,
            "HourlySalary":employerjobsDetailObj.HourlySalary,
            "EmploymentType":employerjobsDetailObj.EmploymentType,
            "Skill1":employerjobsDetailObj.Skill1,
            "Skill1Experiance":employerjobsDetailObj.Skill1Experiance,
            "Skill2":employerjobsDetailObj.Skill2,
            "Skill2Experiance":employerjobsDetailObj.Skill2Experiance,
            "Skill3":employerjobsDetailObj.Skill3,
            "Skill3Experiance":employerjobsDetailObj.Skill3Experiance,
            "Skill4":employerjobsDetailObj.Skill4,
            "Skill4Experiance":employerjobsDetailObj.Skill4Experiance,
            "Skill5":employerjobsDetailObj.Skill5,
            "Skill5Experiance":employerjobsDetailObj.Skill5Experiance,
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

    return this.http.post<any>(`${environment.apiUrl}/apiRouter/employer/addemployerjobs`, jsonObject,httpOptions)
        .pipe(map(data => {
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            if(data){
                return data;
            }
            else
            {
                return data;
            }
        }));

    }

    updateEmployerJobsDetails(employerjobsDetailObj: EmployerJobs):Observable<any>{

        let jsonObject =  
        {
            "EmployerJobs_id":employerjobsDetailObj.EmployerJobs_id,
            "JobTitle":employerjobsDetailObj.JobTitle,
            "City":employerjobsDetailObj.City,
            "State":employerjobsDetailObj.State,
            "Country":employerjobsDetailObj.Country,
            "willRelocate":employerjobsDetailObj.willRelocate,
            "willTravel":employerjobsDetailObj.willTravel,
            "FulltimeSalary":employerjobsDetailObj.FulltimeSalary,
            "HourlySalary":employerjobsDetailObj.HourlySalary,
            "EmploymentType":employerjobsDetailObj.EmploymentType,
            "Skill1":employerjobsDetailObj.Skill1,
            "Skill1Experiance":employerjobsDetailObj.Skill1Experiance,
            "Skill2":employerjobsDetailObj.Skill2,
            "Skill2Experiance":employerjobsDetailObj.Skill2Experiance,
            "Skill3":employerjobsDetailObj.Skill3,
            "Skill3Experiance":employerjobsDetailObj.Skill3Experiance,
            "Skill4":employerjobsDetailObj.Skill4,
            "Skill4Experiance":employerjobsDetailObj.Skill4Experiance,
            "Skill5":employerjobsDetailObj.Skill5,
            "Skill5Experiance":employerjobsDetailObj.Skill5Experiance,
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

       return this.http.put<any>(`${environment.apiUrl}/apiRouter/employer/jobrecord/`+employerjobsDetailObj.EmployerJobs_id, jsonObject,httpOptions)
        .pipe(map(data => {
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            if(data){
                return data;
            }
            else
            {
                return data;
            }
        }));

    }
    
    deleteEmployerJobsDetails(employerjobsDetailObj: EmployerJobs):Observable<any>{

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

       return this.http.delete<any>(`${environment.apiUrl}/apiRouter/employer/jobrecord/`+employerjobsDetailObj.EmployerJobs_id,httpOptions)
        .pipe(map(data => {
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            if(data){
                return data;
            }
            else
            {
                return data;
            }
        }));

    }
    /*
    getAllOpeingJobs() {
        return this.http.get<EmployerJobs[]>(`${environment.apiUrl}/apiRouter/employer/getallopeningjobs/1`);
    }*/

    getAllOpeingJobs() {
        return new Promise<EmployerJobs[]>((resolve, reject) => {
            this.http.get<EmployerJobs[]>(`${environment.apiUrl}/apiRouter/employer/getallopeningjobs/1`)
            .subscribe(res => resolve(res));
        });
    }


    applyJobApplication(jobApplicationObj: JobApplication):Observable<any>{

        let jsonObject =  
        {
            "CandidateRegis_id": jobApplicationObj.CandidateRegis_id,
            "EmployerRegis_id": jobApplicationObj.EmployerRegis_id,
            "EmployerJobs_id": jobApplicationObj.EmployerJobs_id,
            "IsCandidate": jobApplicationObj.IsCandidate,
            "CandidateApplieddate": jobApplicationObj.CandidateApplieddate,
            "EmployerApplieddate": jobApplicationObj.EmployerApplieddate,
        }

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

    return this.http.post<any>(`${environment.apiUrl}/apiRouter/employer/addjobapplication`, jsonObject,httpOptions)
        .pipe(map(data => {
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            if(data){
                return data;
            }
            else
            {
                return data;
            }
        }));

    }

    getAllJobapplicationByCandidate(CandidateRegis_id:any) {
        return new Promise<JobApplication[]>((resolve, reject) => {
            this.http.get<JobApplication[]>(`${environment.apiUrl}/apiRouter/employer/getalljobapplicationbycandidate/`+CandidateRegis_id)
            .subscribe(res => resolve(res));
        });
    }

    getAllJobapplicationByEmployer(EmployerRegis_id:any) {
        return new Promise<JobApplication[]>((resolve, reject) => {
            this.http.get<JobApplication[]>(`${environment.apiUrl}/apiRouter/employer/getalljobapplicationbyemployer/`+EmployerRegis_id)
            .subscribe(res => resolve(res));
        });
    }

    

    getregisterCandidatebyId(CandidateRegis_id:any) {
        return new Promise<CandidateRegister[]>((resolve, reject) => {
            this.http.get<CandidateRegister[]>(`${environment.apiUrl}/apiRouter/candidate/` + CandidateRegis_id)
            .subscribe(res => resolve(res));
        });
    }

}