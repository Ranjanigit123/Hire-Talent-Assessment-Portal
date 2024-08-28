 export class User {
    CandidateRegis_id: number;
    Firstname: string;
    Lastname: string;
    DOB:Date;
    password: string;
    ContactAddress: string;
    City: string;
    State: string;
    Pincode: string;
    Country: string;
    Emailid: string;
    Contactnumber: string;
    Whatsupnumber: string;
    Logindetails_id : number;
    EmployerRegis_id: number;
    LastloginDate: Date;
    IsCandidate: number;
    IsActive: number;
    OrganisationName: string;
}


export class CandidateRegister {
    CandidateRegis_id: number;
    Firstname: string;
    Lastname: string;
    DOB:Date;
    password: string;
    ContactAddress: string;
    City: string;
    State: string;
    Pincode: string;
    Country: string;
    Emailid: string;
    Contactnumber: string;
    Whatsupnumber: string;
    Logindetails_id : number;
    LastloginDate: Date;
    IsCandidate: number;
    IsActive: number;
}
 

export class SkillDetails {
    SkillDetails_id: number;
    CandidateRegis_id: number;
    HighestDegree: string;
    University_Board : string;
    InstituteName: string;
    YearofPassout: string;
    TechnicalSkills: string;
    Cerification : string;
    Percentage: number;
    IsActive: number;
} 

export class ExperienceDetails {
    ExperienceDet_id: number;
    CandidateRegis_id: number;
    CompanyName: string;
    CompanyAddress : string;
    Designation: string;
    StartDate: string;
    EndDate: string;
    IsActive: number;
}  
 

export class EmployerRegister {
    EmployerRegis_id: number;
    OrganisationName: string;
    BusinessSector: string;
    Cerificate1:string;
    Cerificate2:string;
    Cerificate3:string;
    Website:string;
    Emailid: string;
    Password: string;
    CommencementDate:Date;
    ContactAddress: string;
    City: string;
    State: string;
    Pincode: string;
    Country: string;
    Contactnumber: string;
    SizeofEmp : number;
    Logindetails_id : number;
    IsCandidate: number;
    IsActive: number;
}

export class EmployerJobs {
    EmployerJobs_id: number;
	EmployerRegis_id: number;
	JobTitle: string;
	City: string;
	State : string;
	Country: string;
	willRelocate: string;
	willTravel: string;
	FulltimeSalary: string;
	HourlySalary: string;
	EmploymentType: string;
	Skill1 : string;
	Skill1Experiance : string;
	Skill2: string;
	Skill2Experiance: string;
	Skill3: string;
	Skill3Experiance: string;
	Skill4 : string;
	Skill4Experiance: string;
	Skill5 : string;
	Skill5Experiance : string;
    IsCandidate: number;
	IsActive : number;
}

export class JobApplication {
    JobApplication_id : number;
    CandidateRegis_id: number;
	EmployerRegis_id: number;
    EmployerJobs_id : number;
    IsCandidate: number;
    IsActive: number;
    CandidateApplieddate : string;
    EmployerApplieddate: string;
    Firstname: string;
    Lastname: string;
    DOB:Date;
    password: string;
    ContactAddress: string;
    City: string;
    State: string;
    Pincode: string;
    Country: string;
    Emailid: string;
    Contactnumber: string;
    Whatsupnumber: string;
    Logindetails_id : number;
    LastloginDate: Date;
	JobTitle: string;
	willRelocate: string;
	willTravel: string;
	FulltimeSalary: string;
	HourlySalary: string;
	EmploymentType: string;
	Skill1 : string;
	Skill1Experiance : string;
	Skill2: string;
	Skill2Experiance: string;
	Skill3: string;
	Skill3Experiance: string;
	Skill4 : string;
	Skill4Experiance: string;
	Skill5 : string;
	Skill5Experiance : string;
}