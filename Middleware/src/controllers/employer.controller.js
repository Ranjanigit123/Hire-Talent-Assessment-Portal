const pool = require('../../config/dbconfig.js');

let dbConnPool = {};
 
// ***Requests to the Emploter table ***
//================================Employer Details Starts============================================================


dbConnPool.insertEmployer = (OrganisationName, BusinessSector, Cerificate1, Cerificate2, Cerificate3, Website, Emailid, CommencementDate, ContactAddress, SizeofEmp, City, State, Pincode, Country, Contactnumber, Logindetails_id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO employerregis (OrganisationName, BusinessSector, Cerificate1, Cerificate2, Cerificate3, Website, Emailid, CommencementDate, ContactAddress, SizeofEmp, City, State, Pincode, Country, Contactnumber, Logindetails_id, IsActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
             [OrganisationName, BusinessSector, Cerificate1, Cerificate2, Cerificate3, Website, Emailid, CommencementDate, ContactAddress, SizeofEmp, City, State, Pincode, Country, Contactnumber, Logindetails_id, 1], (error, result)=>{
            if(error){
                return reject(error);
            }
             
              return resolve(result.insertId);
        });
    });
};


dbConnPool.getallEmployer = () =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM employerregis', (error, employerlist)=>{
            if(error){
                return reject(error);
            }
            return resolve(employerlist);
        });
    });
};

dbConnPool.getEmployerById = (employerRegisId) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM employerregis WHERE EmployerRegis_id = ?',[employerRegisId], (error, employerRecord)=>{
            if(error){
                return reject(error);
            }
            return resolve(employerRecord[0]);
        });
    });
};

dbConnPool.updateEmployerById = (OrganisationName, BusinessSector, Cerificate1, Cerificate2, Cerificate3, Website, CommencementDate, ContactAddress, SizeofEmp, City, State, Pincode, Country, Contactnumber, employerRegisId) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE employerregis SET OrganisationName = ?, BusinessSector = ?, Cerificate1 = ?, Cerificate2 = ?, Cerificate3 = ?, Website = ?, CommencementDate = ?, ContactAddress = ?, SizeofEmp = ?, City = ?, State = ?, Pincode = ?, Country = ?, Contactnumber = ? WHERE EmployerRegis_id = ?', [OrganisationName, BusinessSector, Cerificate1, Cerificate2, Cerificate3, Website, CommencementDate, ContactAddress, SizeofEmp, City, State, Pincode, Country, Contactnumber, employerRegisId], (error)=>{
            if(error){
                return reject(error);
            }
             
             return resolve({message: "Employer updated sucessfully.." });
        });
    });
};

dbConnPool.deleteEmployerById = (IsActive, employerRegisId) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE employerregis SET IsActive = ? WHERE EmployerRegis_id = ?', [IsActive, employerRegisId], (error)=>{
            if(error){
                return reject(error);
            }
             
             return resolve({message: "Employer deleted sucessfully.." });
        });
    });
};

 
dbConnPool.getEmployerByEmail = (email) =>{
    return new Promise((resolve, reject)=>{
            pool.query('SELECT * FROM Logindetails log INNER JOIN employerregis candi ON  candi.Emailid = log.Emailid Where candi.Emailid = ?', [email], (error, loginusers)=>{            
            if(error){
               return reject(error);
            }
            return resolve(loginusers[0]);
        });
    });
};

//================================Job Details========================

dbConnPool.insertEmployerjobs = ( EmployerRegis_id,JobTitle,City ,State, Country,willRelocate,willTravel,FulltimeSalary,HourlySalary,EmploymentType,Skill1,Skill1Experiance,Skill2,Skill2Experiance,Skill3,Skill3Experiance,Skill4,Skill4Experiance,Skill5,Skill5Experiance) =>{
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO EmployerJobs ( EmployerRegis_id,JobTitle,City ,State, Country,willRelocate,willTravel,FulltimeSalary,HourlySalary,EmploymentType,Skill1,Skill1Experiance,Skill2,Skill2Experiance,Skill3,Skill3Experiance,Skill4,Skill4Experiance,Skill5,Skill5Experiance,IsActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?)',
             [ EmployerRegis_id,JobTitle,City ,State, Country,willRelocate,willTravel,FulltimeSalary,HourlySalary,EmploymentType,Skill1,Skill1Experiance,Skill2,Skill2Experiance,Skill3,Skill3Experiance,Skill4,Skill4Experiance,Skill5,Skill5Experiance,1], (error, result)=>{
            if(error){
                return reject(error);
            }
             
              return resolve(result.insertId);
        });
    });
};

dbConnPool.getJobEmployerRegisId = (employerRegisId) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM EmployerJobs WHERE  EmployerRegis_id = ? and IsActive=1',[employerRegisId], (error, jobLists)=>{
            if(error){
                return reject(error);
            }
            return resolve(jobLists);
        });
    });
};

dbConnPool.getEmployerjobsById = (employerJobs_id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM EmployerJobs WHERE  EmployerJobs_id  = ?',[employerJobs_id], (error, JobRecord)=>{
            if(error){
                return reject(error);
            }
            return resolve(JobRecord[0]);
        });
    });
};

dbConnPool.updateJobById = (JobTitle,City ,State, Country,willRelocate,willTravel,FulltimeSalary,HourlySalary,EmploymentType,Skill1,Skill1Experiance,Skill2,Skill2Experiance,Skill3,Skill3Experiance,Skill4,Skill4Experiance,Skill5,Skill5Experiance,employerjobs_id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE  EmployerJobs SET JobTitle = ?,City = ?,State = ?, Country = ?,willRelocate = ?,willTravel = ?,FulltimeSalary = ?,HourlySalary = ?,EmploymentType = ?,Skill1 = ?,Skill1Experiance = ?,Skill2 = ?,Skill2Experiance = ?,Skill3 = ?,Skill3Experiance = ?,Skill4 = ?,Skill4Experiance = ?,Skill5 = ?,Skill5Experiance = ? WHERE EmployerJobs_id = ?', [JobTitle,City ,State, Country,willRelocate,willTravel,FulltimeSalary,HourlySalary,EmploymentType,Skill1,Skill1Experiance,Skill2,Skill2Experiance,Skill3,Skill3Experiance,Skill4,Skill4Experiance,Skill5,Skill5Experiance,employerjobs_id], (error)=>{
            if(error){
                return reject(error);
            }
             
             return resolve({message: "JobDetails updated sucessfully.." });
        });
    });
};

dbConnPool.deleteJobById = (IsActive, employerJobs_id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE EmployerJobs SET IsActive = ? WHERE EmployerJobs_id = ?', [IsActive, employerJobs_id], (error)=>{
            if(error){
                return reject(error);
            }
             
             return resolve({message: " Jobdetails deleted sucessfully.." });
        });
    });
}


dbConnPool.getAllOpeingJobs = () =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM EmployerJobs WHERE  IsActive = 1', (error, jobLists)=>{
            if(error){
                return reject(error);
            }
            return resolve(jobLists);
        });
    });
};

//===============================Job Application=============================

dbConnPool.insertJobapplication = (CandidateRegis_id, EmployerRegis_id, EmployerJobs_id, IsCandidate, CandidateApplieddate, EmployerApplieddate) =>{
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO JobApplication (CandidateRegis_id, EmployerRegis_id, EmployerJobs_id, IsCandidate, IsActive, CandidateApplieddate, EmployerApplieddate) VALUES (?, ?, ?, ?, ?, ?, ?)',
             [CandidateRegis_id, EmployerRegis_id, EmployerJobs_id, IsCandidate, 1, CandidateApplieddate, EmployerApplieddate], (error, result)=>{
            if(error){
                return reject(error);
            }
             
              return resolve(result.insertId);
        });
    });
};  

dbConnPool.getAllJobapplicationByCandidate = (CandidateRegis_id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM JobApplication WHERE  IsActive = 1 and CandidateRegis_id = ?',[CandidateRegis_id], (error, jobappLists)=>{
            if(error){
                return reject(error);
            }
            return resolve(jobappLists);
        });
    });
};

dbConnPool.getAllJobapplicationByEmployer = (EmployerRegis_id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('select * from CandidateRegis candi INNER JOIN JobApplication job ON  candi.CandidateRegis_id = job.CandidateRegis_id INNER JOIN EmployerJobs empjob ON  job.EmployerJobs_id = empjob.EmployerJobs_id where job.EmployerRegis_id = ?  and candi.isactive=1 group by job.EmployerJobs_id',[EmployerRegis_id], (error, jobappLists)=>{
            if(error){
                return reject(error);
            }
            return resolve(jobappLists);
        });
    });
};

dbConnPool.updateJobapplicationById = (CandidateRegis_id,EmployerRegis_id,EmplopyerJobs_id,IsCandidate,IsActive,CandidateApplieddate,EmployerApplieddate,JobApplication_id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE   Job Application SET  CandidateRegis_id = ?,EmployerRegis_id = ? ,EmployerJobs_id = ?,IsCandidate = ?,IsActive = ? ,CandidateApplieddate = ? ,EmployerApplieddate = ?  WHERE JobApplication_id = ?  ', [CandidateRegis_id,EmployerRegis_id,EmplopyerJobs_id,IsCandidate,IsActive,CandidateApplieddate,EmployerApplieddate,JobApplication_id], (error)=>{
            if(error){
                return reject(error);
            }
             
             return resolve({message: "Job Application updated sucessfully.." });
        });
    });
};

dbConnPool.deleteJobapplicationById = (IsCandidate,IsActive,JobApplication_id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE Job Application SET IsCandidate = ? ,IsActive = ? WHERE JobApplication_id = ?', [IsCandidate,IsActive,JobApplication_id], (error)=>{
            if(error){
                return reject(error);
            }
             
             return resolve({message: " Job Application deleted sucessfully.." });
        });
    });
}
module.exports = dbConnPool;