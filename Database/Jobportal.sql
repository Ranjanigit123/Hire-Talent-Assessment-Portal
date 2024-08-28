  
CREATE TABLE CandidateRegis (    
	CandidateRegis_id int NOT NULL AUTO_INCREMENT,
	Firstname varchar(255),
	Lastname varchar(255),
	DOB date,
	ContactAddress varchar(255),
	City varchar(255),
	State varchar(255),
	Pincode varchar(255),
	Country varchar(255),
	Emailid varchar(255),
	Contactnumber varchar(255),
	Whatsupnumber varchar(255),
	Logindetails_id int,
	IsActive TINYINT,
	PRIMARY KEY (CandidateRegis_id));
	
	
 CREATE TABLE Logindetails(    
  Logindetails_id int NOT NULL AUTO_INCREMENT,
  Emailid varchar(255),  
  pwd varchar(255) NOT NULL, 
  LastloginDate datetime NOT NULL,
  IsCandidate TINYINT,
  IsActive TINYINT,
  PRIMARY KEY (Logindetails_id));
  
 
CREATE TABLE SkillDetails(  
	SkillDetails_id int NOT NULL AUTO_INCREMENT,
	CandidateRegis_id int,
	HighestDegree varchar(100),
	University_Board varchar(100),
	InstituteName varchar(100),
	YearofPassout date,
	Percentage int,	
	TechnicalSkills varchar(255),
	Cerification varchar(255),	
	IsActive TINYINT,
	PRIMARY KEY (SkillDetails_id));
     
CREATE TABLE ExperienceDet(
	ExperienceDet_id int NOT NULL AUTO_INCREMENT,
	CandidateRegis_id int,
	CompanyName varchar(255),
	CompanyAddress varchar(255),	
	Designation varchar(255),
	StartDate date,
	EndDate date,
	IsActive TINYINT,
	PRIMARY KEY (ExperienceDet_id));
	 
     

  
CREATE TABLE EmployerRegis(
	EmployerRegis_id int NOT NULL AUTO_INCREMENT,
	OrganisationName varchar(255),
	BusinessSector varchar(255),
	Cerificate1 varchar(50),
	Cerificate2 varchar(50),
	Cerificate3 varchar(50),
	Website varchar(255),
	Emailid varchar(255),
	CommencementDate date,
	ContactAddress varchar(255),
	SizeofEmp int,
	City varchar(255),
	State varchar(255),
	Pincode varchar(255),
	Country varchar(255),	
	Contactnumber varchar(255),
	Logindetails_id int,	
	IsActive TINYINT,
	PRIMARY KEY (EmployerRegis_id));

 
CREATE TABLE EmployerJobs(
	EmployerJobs_id int NOT NULL AUTO_INCREMENT,
	EmployerRegis_id int,
	JobTitle varchar(255),
	City varchar(255),
	State varchar(255),
	Country varchar(255),
	willRelocate varchar(50),
	willTravel varchar(50),
	FulltimeSalary varchar(50),
	HourlySalary varchar(50),
	EmploymentType varchar(50),
	Skill1 varchar(255),
	Skill1Experiance varchar(255),
	Skill2 varchar(255),
	Skill2Experiance varchar(255),
	Skill3 varchar(255),
	Skill3Experiance varchar(255),
	Skill4 varchar(255),
	Skill4Experiance varchar(255),
	Skill5 varchar(255),
	Skill5Experiance varchar(255),
	IsActive TINYINT,
        PRIMARY KEY (EmployerJobs_id)); 
     

CREATE TABLE JobApplication(
    JobApplication_id int NOT NULL AUTO_INCREMENT,
    CandidateRegis_id int,
    EmployerRegis_id int,
    EmployerJobs_id int,
    IsCandidate TINYINT,
    IsActive TINYINT,
    CandidateApplieddate date,
    EmployerApplieddate date,
    PRIMARY KEY (JobApplication_id));
     
 
