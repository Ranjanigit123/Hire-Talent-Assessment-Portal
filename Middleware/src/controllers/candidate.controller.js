const pool = require('../../config/dbconfig.js');

let dbConnPool = {};
 
// ***Requests to the Candidate table ***
//================================Candidate Details Starts============================================================

dbConnPool.insertLogindetails = ( Emailid, pwd, IsCandidate) =>{
    return new Promise((resolve, reject)=>{
        var dateVal = new Date();
        var dateTime= dateVal.toISOString().slice(0, 19).replace('T', ' ');

        pool.query('INSERT INTO logindetails (Emailid,pwd,LastloginDate,IsCandidate,IsActive) VALUES (?,?,?,?,?)',
             [Emailid, pwd, dateTime, IsCandidate, 1], (error, result)=>{
            if(error){
                return reject(error);
            }
             
              return resolve(result.insertId);
        });
    });
};

dbConnPool.insertCandidate = (Firstname, Lastname, DOB, ContactAddress, City, State, Pincode, Country, Emailid, Contactnumber, Whatsupnumber, Logindetails_id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO candidateregis (Firstname, Lastname, DOB, ContactAddress, City, State, Pincode, Country, Emailid, Contactnumber, Whatsupnumber, Logindetails_id,IsActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
             [Firstname, Lastname, DOB, ContactAddress, City, State, Pincode, Country, Emailid, Contactnumber, Whatsupnumber, Logindetails_id, 1], (error, result)=>{
            if(error){
                return reject(error);
            }
             
              return resolve(result.insertId);
        });
    });
};

dbConnPool.getallCandidate = () =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM CandidateRegis', (error, candidatelist)=>{
            if(error){
                return reject(error);
            }
            return resolve(candidatelist);
        });
    });
};

dbConnPool.getCandidateById = (candidateRegisId) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM CandidateRegis WHERE CandidateRegis_id = ?',[candidateRegisId], (error, candidateRecord)=>{
            if(error){
                return reject(error);
            }
            return resolve(candidateRecord[0]);
        });
    });
};

dbConnPool.updateCandidateById = (Firstname, Lastname, DOB, ContactAddress, City, State, Pincode, Country, Contactnumber, Whatsupnumber, candidateRegisId) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE CandidateRegis SET Firstname = ?, Lastname = ?, DOB = ?, ContactAddress = ?, City = ?, State = ?, Pincode = ?, Country = ?, Contactnumber = ?, Whatsupnumber = ? WHERE CandidateRegis_id = ?', [Firstname, Lastname, DOB, ContactAddress, City, State, Pincode, Country, Contactnumber, Whatsupnumber, candidateRegisId], (error)=>{
            if(error){
                return reject(error);
            }
             
             return resolve({message: "Candidate updated sucessfully.." });
        });
    });
};

dbConnPool.DeleteCandidateById = (IsActive, candidateRegisId) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE CandidateRegis SET IsActive = ? WHERE CandidateRegis_id = ?', [IsActive, candidateRegisId], (error)=>{
            if(error){
                return reject(error);
            }
             
             return resolve({message: "Candidate deleted sucessfully.." });
        });
    });
};

dbConnPool.getCandidateByEmail = (email) =>{
    return new Promise((resolve, reject)=>{
        //pool.query('SELECT * FROM Logindetails WHERE Emailid = ?', [email], (error, loginusers)=>{
            pool.query('SELECT * FROM Logindetails log INNER JOIN CandidateRegis candi ON  candi.Emailid = log.Emailid Where log.Emailid = ?', [email], (error, loginusers)=>{            
            if(error){
                return reject(error);
            }
            return resolve(loginusers[0]);
        });
    });
};

//==================================================

//================================Candidate Skill Details Starts============================================================

dbConnPool.insertSkilldetails = (CandidateRegis_id,HighestDegree,University_Board,InstituteName,YearofPassout,Percentage,TechnicalSkills,Cerification) =>{
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO skilldetails (CandidateRegis_id,HighestDegree,University_Board,InstituteName,YearofPassout,Percentage, TechnicalSkills,Cerification,IsActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
             [CandidateRegis_id,HighestDegree,University_Board,InstituteName,YearofPassout,Percentage,TechnicalSkills,Cerification,1], (error, result)=>{
            if(error){
                return reject(error);
            }
             
              return resolve(result.insertId);
        });
    });
};

dbConnPool.getSkillCandidateRegisId = (candidateRegisId) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM SkillDetails WHERE CandidateRegis_id = ? and IsActive=1',[candidateRegisId], (error, skillLists)=>{
            if(error){
                return reject(error);
            }
            return resolve(skillLists);
        });
    });
};

dbConnPool.getSkilldetailById = (skillDetails_id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM SkillDetails WHERE skillDetails_id = ?',[skillDetails_id], (error, SkillRecord)=>{
            if(error){
                return reject(error);
            }
            return resolve(SkillRecord[0]);
        });
    });
};

dbConnPool.updateSkillById = (HighestDegree,University_Board,InstituteName,YearofPassout,TechnicalSkills,Cerification,Percentage,skillDetails_id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE SkillDetails SET HighestDegree = ?, University_Board = ?, InstituteName = ?, YearofPassout = ?, TechnicalSkills = ?, Cerification = ?, Percentage = ? WHERE SkillDetails_id = ?', [HighestDegree,University_Board,InstituteName,YearofPassout,TechnicalSkills,Cerification,Percentage,skillDetails_id], (error)=>{
            if(error){
                return reject(error);
            }
             
             return resolve({message: "SkillDetails updated sucessfully.." });
        });
    });
};

dbConnPool.deleteSkillById = (IsActive, skillDetails_id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE SkillDetails SET IsActive = ? WHERE SkillDetails_id = ?', [IsActive, skillDetails_id], (error)=>{
            if(error){
                return reject(error);
            }
             
             return resolve({message: "SkillDetails deleted sucessfully.." });
        });
    });
};


//==================================================

//================================Candidate Experiance Details Starts============================================================

dbConnPool.insertExperienceDetails = (CandidateRegis_id, CompanyName, CompanyAddress, Designation, StartDate, EndDate) =>{
    return new Promise((resolve, reject)=>{
        pool.query('INSERT INTO ExperienceDet (CandidateRegis_id, CompanyName, CompanyAddress, Designation, StartDate, EndDate,IsActive) VALUES (?, ?, ?, ?, ?, ?, ?)',
             [CandidateRegis_id, CompanyName, CompanyAddress, Designation, StartDate, EndDate, 1], (error, result)=>{
            if(error){
                return reject(error);
            }
             
              return resolve(result.insertId);
        });
    });
};

dbConnPool.getExperienceByCandidateRegisId = (candidateRegisId) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM ExperienceDet WHERE CandidateRegis_id = ? and IsActive=1',[candidateRegisId], (error, experienceLists)=>{
            if(error){
                return reject(error);
            }
            return resolve(experienceLists);
        });
    });
};

dbConnPool.getExperienceDetById = (ExperienceDet_id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('SELECT * FROM ExperienceDet WHERE ExperienceDet_id = ?',[ExperienceDet_id], (error, experienceRecord)=>{
            if(error){
                return reject(error);
            }
            return resolve(experienceRecord[0]);
        });
    });
};

dbConnPool.updateExperienceDetById = (CompanyName, CompanyAddress, Designation, StartDate, EndDate, ExperienceDet_id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE ExperienceDet SET CompanyName = ?, CompanyAddress = ?, Designation = ?, StartDate = ?, EndDate = ? WHERE ExperienceDet_id = ?', [CompanyName, CompanyAddress, Designation, StartDate, EndDate,ExperienceDet_id], (error)=>{
            if(error){
                return reject(error);
            }
             
             return resolve({message: "Experience Details updated sucessfully.." });
        });
    });
};

dbConnPool.deleteExperienceDetById = (IsActive, ExperienceDet_id) =>{
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE ExperienceDet SET IsActive = ? WHERE ExperienceDet_id = ?', [IsActive, ExperienceDet_id], (error)=>{
            if(error){
                return reject(error);
            }
             
             return resolve({message: "Experience Details deleted sucessfully.." });
        });
    });
};


//==================================================


module.exports = dbConnPool;