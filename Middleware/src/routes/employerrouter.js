const express =require('express');
const employerController = require('../controllers/employer.controller.js');
const employerRouter = express.Router();
 

//================================Employer Details Starts============================================================

employerRouter.get('/', async (req, res, next)=>{
    try {
        const employerList = await employerController.getallEmployer();
        res.json({employerList: employerList});
    } catch(e) {
        console.log(e);
    }
});

employerRouter.get('/:employerRegisId', async (req, res, next)=> {
    try{
        let employerRegisId = req.params.employerRegisId;
        let employerRecord =  await employerController.getEmployerById(employerRegisId)

        res.json({employerRecord:employerRecord});
          
    } catch(e) {
        console.log(e);
        res.sendStatus(404);
    }
});
 
employerRouter.put('/:employerRegisId',  async (req, res, next)=>{
    try{

        var OrganisationName = req.body.OrganisationName;
        var BusinessSector = req.body.BusinessSector;
        var Cerificate1 = req.body.Cerificate1;
        var Cerificate2 = req.body.Cerificate2;
        var Cerificate3 = req.body.Cerificate3;
        var Website = req.body.Website;
        var CommencementDate =  new Date(req.body.CommencementDate); 
        var ContactAddress = req.body.ContactAddress;
        var SizeofEmp = req.body.SizeofEmp;
        var City = req.body.City;
        var State = req.body.State;
        var Pincode = req.body.Pincode;
        var Country = req.body.Country;
        var Contactnumber = req.body.Contactnumber;
        const employerRegisId = req.params.employerRegisId;;

        if (!OrganisationName || !BusinessSector || !CommencementDate) {
            return res.sendStatus(400);
         }

        let msg =  await employerController.updateEmployerById(OrganisationName, BusinessSector, Cerificate1, Cerificate2, Cerificate3, Website, CommencementDate, ContactAddress, SizeofEmp, City, State, Pincode, Country, Contactnumber, employerRegisId);
        res.json(msg);
 
    } catch(e){    
        console.log(e);
        res.sendStatus(400);
    }
});

employerRouter.delete('/:employerRegisId',  async (req, res, next)=>{
    try{
        var IsActive = req.body.IsActive;
        const employerRegisId = req.params.employerRegisId;

        let msg =  await employerController.deleteEmployerById(IsActive, employerRegisId);
        res.json(msg);
 
    } catch(e){    
        console.log(e);
        res.sendStatus(400);
    }
});

 
//==================================================
//================================Employer Job details Starts============================================================


employerRouter.post('/addemployerjobs', async (req, res, next)=>{
    try{
         
        var EmployerRegis_id = req.body.EmployerRegis_id;
        var JobTitle = req.body.JobTitle;
        var City = req.body.City;
        var State = req.body.State;
        var Country = req.body.Country
        var willRelocate = req.body.willRelocate;
        var willTravel = req.body.willTravel;
        var FulltimeSalary = req.body.FulltimeSalary;
        var HourlySalary = req.body.HourlySalary;
        var EmploymentType = req.body.EmploymentType;
        var Skill1 = req.body.Skill1;
        var Skill1Experiance = req.body.Skill1Experiance;
        var Skill2 = req.body.Skill2;
        var Skill2Experiance = req.body.Skill2Experiance;
        var Skill3 = req.body.Skill3;
        var Skill3Experiance = req.body.Skill3Experiance;
        var Skill4 = req.body.Skill4;
        var Skill4Experiance = req.body.Skill4Experiance;
        var Skill5 = req.body.Skill5;
        var Skill5Experiance = req.body.Skill5Experiance;

        if (!EmployerRegis_id || !JobTitle || !City) {
            return res.sendStatus(400);
         }

        const employerJobsID =  await employerController.insertEmployerjobs( EmployerRegis_id,JobTitle,City ,State, Country,willRelocate,willTravel,FulltimeSalary,HourlySalary,EmploymentType,Skill1,Skill1Experiance,Skill2,Skill2Experiance,Skill3,Skill3Experiance,Skill4,Skill4Experiance,Skill5,Skill5Experiance);
        res.json({"employerJobsID" : employerJobsID});
    } catch(e){    
        console.log(e);
        res.json(e);
        //res.sendStatus(400);
    }
});

employerRouter.get('/employerjobs/:employerRegisId', async (req, res, next)=>{
    try{
        let employerRegisId = req.params.employerRegisId;

        if (!employerRegisId) {
            return res.sendStatus(400);
         }

        var jobLists =  await employerController.getJobEmployerRegisId(employerRegisId);
        res.send(jobLists);
  
    } catch(e){    
        console.log(e);
        res.json(e);
        //res.sendStatus(400);
    }
});

employerRouter.get('/jobrecord/:employerJobsid', async (req, res, next)=>{
    try{
        let employerJobsid = req.params.employerJobsid;

        if (!employerJobsid) {
            return res.sendStatus(400);
         }

        var jobRecord =  await employerController.getEmployerjobsById(employerJobsid);
        res.json({JobRecord:jobRecord});
  
    } catch(e){    
        console.log(e);
        res.json(e);
        //res.sendStatus(400);
    }
});
 
employerRouter.put('/jobrecord/:employerJobid',  async (req, res, next)=>{
    try{
        var JobTitle = req.body.JobTitle;
        var City = req.body.City;
        var State = req.body.State;
        var Country = req.body.Country
        var willRelocate = req.body.willRelocate;
        var willTravel = req.body.willTravel;
        var FulltimeSalary = req.body.FulltimeSalary;
        var HourlySalary = req.body.HourlySalary;
        var EmploymentType = req.body.EmploymentType;
        var Skill1 = req.body.Skill1;
        var Skill1Experiance = req.body.Skill1Experiance;
        var Skill2 = req.body.Skill2;
        var Skill2Experiance = req.body.Skill2Experiance;
        var Skill3 = req.body.Skill3;
        var Skill3Experiance = req.body.Skill3Experiance;
        var Skill4 = req.body.Skill4;
        var Skill4Experiance = req.body.Skill4Experiance;
        var Skill5 = req.body.Skill5;
        var Skill5Experiance = req.body.Skill5Experiance;
        const employerJobid = req.params.employerJobid;

        if (!employerJobid) {
            return res.sendStatus(400);
         }

        let msg =  await employerController.updateJobById( JobTitle,City ,State, Country,willRelocate,willTravel,FulltimeSalary,HourlySalary,EmploymentType,Skill1,Skill1Experiance,Skill2,Skill2Experiance,Skill3,Skill3Experiance,Skill4,Skill4Experiance,Skill5,Skill5Experiance,employerJobid);
        
        res.json(msg);
 
    } catch(e){    
        console.log(e);
        res.sendStatus(400);
    }
});

employerRouter.delete('/jobrecord/:employerJobsid',  async (req, res, next)=>{
    try{
        var IsActive = 0;//req.body.IsActive;
        const  employerJobsid = req.params.employerJobsid;

        let msg =  await employerController.deleteJobById(IsActive, employerJobsid);
        res.json(msg);
 
    } catch(e){    
        console.log(e);
        res.sendStatus(400);
    }
});

employerRouter.get('/getallopeningjobs/:id', async (req, res, next)=>{
    try{

        var jobLists =  await employerController.getAllOpeingJobs();
        res.send(jobLists);
  
    } catch(e){    
        console.log(e);
        res.json(e);
        //res.sendStatus(400);
    }
});

//==================================================
//===============================Job Application====================
employerRouter.post('/addjobapplication', async (req, res, next)=>{
    try{
         
        var CandidateRegis_id = req.body.CandidateRegis_id;
        var EmployerRegis_id = req.body.EmployerRegis_id;
        var EmployerJobs_id = req.body.EmployerJobs_id;
        var IsCandidate = req.body.IsCandidate;
        //var IsActive = req.body.IsActive;
        var CandidateApplieddate = req.body.CandidateApplieddate;
        var EmployerApplieddate = req.body.EmployerApplieddate;
         
    

        if (!EmployerJobs_id ) {
            return res.sendStatus(400);
         }

        const JobApplication_id =  await employerController.insertJobapplication(CandidateRegis_id, EmployerRegis_id, EmployerJobs_id, IsCandidate, CandidateApplieddate, EmployerApplieddate);
        res.json({"jobApplication_id" : JobApplication_id});
  
    } catch(e){    
        console.log(e);
        res.json(e);
        //res.sendStatus(400);
    }
});



employerRouter.get('/getalljobapplicationbycandidate/:candidateRegisId', async (req, res, next)=>{
    try{
        const  employerRegisId = req.params.candidateRegisId;

        var jobappLists =  await employerController.getAllJobapplicationByCandidate(employerRegisId);
        res.send(jobappLists);
  
    } catch(e){    
        console.log(e);
        res.json(e);
        //res.sendStatus(400);
    }
});

employerRouter.get('/getalljobapplicationbyemployer/:employerRegisId', async (req, res, next)=>{
    try{
        const  employerRegisId = req.params.employerRegisId;

        var jobappLists =  await employerController.getAllJobapplicationByEmployer(employerRegisId);
        res.send(jobappLists);
  
    } catch(e){    
        console.log(e);
        res.json(e);
        //res.sendStatus(400);
    }
});


employerRouter.put('/jobapplicationrecord/:JobApplication_id',  async (req, res, next)=>{
    try{
        var CandidateRegis_id = req.body.CandidateRegis_id;
        var EmployerRegis_id = req.body.EmployerRegis_id;
        var EmployerJobs_id = req.body.EmployerJobs_id;
        var IsCandidate = req.body.IsCandidate;
        var IsActive = req.body.IsActive;
        var CandidateApplieddate = req.body.CandidateApplieddate;
        var EmployerApplieddate = req.body.EmployerApplieddate;
        const JobApplication_id = req.params.JobApplication_id;

        if (!JobApplication_id) {
            return res.sendStatus(400);
         }

        let msg =  await employerController.updateJobapplicationById(CandidateRegis_id,EmployerRegis_id,EmployerJobs_id,IsCandidate,IsActive,CandidateApplieddate,EmployerApplieddate,JobApplication_id );
        
        res.json(msg);
 
    } catch(e){    
        console.log(e);
        res.sendStatus(400);
    }
});

employerRouter.delete('/jobapplicationrecord/:JobApplication_id',  async (req, res, next)=>{
    try{
        var IsCandidate = req.body.IsCandidate;
        var IsActive = req.body.IsActive;
        const JobApplication_id = req.params.JobApplication_id;

       

        let msg =  await employerController.deleteJobapplicationById(IsCandidate,IsActive,JobApplication_id);
        res.json(msg);
 
    } catch(e){    
        console.log(e);
        res.sendStatus(400);
    }
});
module.exports = employerRouter;
 


 
