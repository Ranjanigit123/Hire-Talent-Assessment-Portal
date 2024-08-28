const express =require('express');
const candidateController = require('../controllers/candidate.controller.js');
const candidateRouter = express.Router();
var fs = require('fs');
path = require('path'),
cors = require('cors'),
multer = require('multer'),
bodyParser = require('body-parser');

//================================Candidate Resume Starts============================================================

  // POST File
candidateRouter.post('/uploadresume', function (req, res, next) {
 
    // output the headers
    const chunks = [];
    // capture the encoded form data
    req.on('data', (data) => {
        chunks.push(data instanceof Buffer ? data : Buffer.from(data));
    });

    // send a response when finished reading
    req.on('end', () => {
        var resumePathFilename = __dirname + '\\' + 'Sample.pdf';
        fs.writeFile(resumePathFilename, Buffer.concat(chunks), function (err) {
           // fileBuffer = fs.readFileSync(fileBlobName);
           res.send('ok');
        });
    });
    //res.send('ok');
  });


//================================Candidate Resume ends===============





//================================Candidate Details Starts============================================================

candidateRouter.get('/', async (req, res, next)=>{
    try {
        const candidateList = await candidateController.getallCandidate();
        res.json({candidateList: candidateList});
    } catch(e) {
        console.log(e);
    }
});

candidateRouter.get('/:candidateRegisId', async (req, res, next)=> {
    try{
        let candidateRegisId = req.params.candidateRegisId;
        let candidateRecord =  await candidateController.getCandidateById(candidateRegisId)

        res.json({candidateRecord: candidateRecord});
          
    } catch(e) {
        console.log(e);
        res.sendStatus(404);
    }
});
 
candidateRouter.put('/:candidateRegisId',  async (req, res, next)=>{
    try{
        var Firstname = req.body.Firstname;
        var Lastname = req.body.Lastname;
        var DOB = new Date(req.body.DOB);;
        var ContactAddress = req.body.ContactAddress;
        var City = req.body.City;
        var State = req.body.State;
        var Pincode = req.body.Pincode;
        var Country = req.body.Country;
        var Contactnumber = req.body.Contactnumber;
        var Whatsupnumber = req.body.Whatsupnumber;
        const candidateRegisId = req.params.candidateRegisId;

        if (!Firstname || !Lastname || !DOB) {
            return res.sendStatus(400);
         }

        let msg =  await candidateController.updateCandidateById(Firstname, Lastname, DOB, ContactAddress, City, State, Pincode, Country, Contactnumber, Whatsupnumber, candidateRegisId);
        res.json(msg);
 
    } catch(e){    
        console.log(e);
        res.sendStatus(400);
    }
});

candidateRouter.delete('/:candidateRegisId',  async (req, res, next)=>{
    try{
        var IsActive = req.body.IsActive;
        const candidateRegisId = req.params.candidateRegisId;

       

        let msg =  await candidateController.DeleteCandidateById(IsActive, candidateRegisId);
        res.json(msg);
 
    } catch(e){    
        console.log(e);
        res.sendStatus(400);
    }
});

//==================================================
//================================Candidate Skill Details Starts============================================================


candidateRouter.post('/addskilldetails', async (req, res, next)=>{
    try{
         
        var CandidateRegis_id = req.body.CandidateRegis_id;
        var HighestDegree = req.body.HighestDegree;
        var University_Board = req.body.University_Board;
        var InstituteName = req.body.InstituteName;
        var YearofPassout = new Date(req.body.YearofPassout);;
        var TechnicalSkills = req.body.TechnicalSkills;
        var Cerification = req.body.Cerification;
        var Percentage = req.body.Percentage;

        if (!CandidateRegis_id || !HighestDegree || !YearofPassout) {
            return res.sendStatus(400);
         }

        const skilldetailID =  await candidateController.insertSkilldetails(CandidateRegis_id,HighestDegree,University_Board,InstituteName,YearofPassout,Percentage,TechnicalSkills,Cerification);

        res.json({"skilldetailID" : skilldetailID});
    } catch(e){    
        console.log(e);
        res.json(e);
        //res.sendStatus(400);
    }
});

candidateRouter.get('/skilldetails/:candidateRegisId', async (req, res, next)=>{
    try{
        let candidateRegisId = req.params.candidateRegisId;

        if (!candidateRegisId) {
            return res.sendStatus(400);
         }

        var skillLists =  await candidateController.getSkillCandidateRegisId(candidateRegisId);
        res.send(skillLists);
  
    } catch(e){    
        console.log(e);
        res.json(e);
        //res.sendStatus(400);
    }
});

candidateRouter.get('/skillrecord/:skillDetailid', async (req, res, next)=>{
    try{
        let skillDetailid = req.params.skillDetailid;

        if (!skillDetailid) {
            return res.sendStatus(400);
         }

        var skillRecord =  await candidateController.getSkilldetailById(skillDetailid);
        res.json({SkillRecord:skillRecord});
  
    } catch(e){    
        console.log(e);
        res.json(e);
        //res.sendStatus(400);
    }
});
 
candidateRouter.put('/skillrecord/:skillDetailid',  async (req, res, next)=>{
    try{
        var HighestDegree = req.body.HighestDegree;
        var University_Board = req.body.University_Board;
        var InstituteName = req.body.InstituteName;
        var YearofPassout = new Date(req.body.YearofPassout);;
        var TechnicalSkills = req.body.TechnicalSkills;
        var Cerification = req.body.Cerification;
        var Percentage = req.body.Percentage;
        const skillDetailid = req.params.skillDetailid;

        if (!skillDetailid) {
            return res.sendStatus(400);
         }

        let msg =  await candidateController.updateSkillById(HighestDegree,University_Board,InstituteName,YearofPassout,TechnicalSkills,Cerification,Percentage,skillDetailid);
        res.json(msg);
 
    } catch(e){    
        console.log(e);
        res.sendStatus(400);
    }
});

candidateRouter.delete('/skillrecord/:skillDetailid',  async (req, res, next)=>{
    try{
        var IsActive = 0;//req.body.IsActive;
        const skillDetailid = req.params.skillDetailid;

        let msg =  await candidateController.deleteSkillById(IsActive, skillDetailid);
        res.json(msg);
 
    } catch(e){    
        console.log(e);
        res.sendStatus(400);
    }
});

//==================================================

//================================Candidate Experiance Details Starts============================================================
candidateRouter.post('/addexperiencedetail', async (req, res, next)=>{
    try{
        var CandidateRegis_id = req.body.CandidateRegis_id;
        var CompanyName = req.body.CompanyName;
        var Designation = req.body.Designation;
        var CompanyAddress = req.body.CompanyAddress;
        var StartDate = new Date(req.body.StartDate);
        var EndDate = new Date(req.body.EndDate);

        if (!CompanyName) {
            return res.sendStatus(400);
         }

        const expdetailID =  await candidateController.insertExperienceDetails(CandidateRegis_id, CompanyName, CompanyAddress, Designation, StartDate, EndDate);

        res.json({"expdetailID" : expdetailID});
  
    } catch(e){    
        console.log(e);
        res.json(e);
        //res.sendStatus(400);
    }
});

candidateRouter.get('/experiencedetails/:candidateRegisId', async (req, res, next)=>{
    try{
        let candidateRegisId = req.params.candidateRegisId;

        if (!candidateRegisId) {
            return res.sendStatus(400);
         }

        var experienceLists =  await candidateController.getExperienceByCandidateRegisId(candidateRegisId);
        res.send(experienceLists);

  
    } catch(e){    
        console.log(e);
        res.json(e);
        //res.sendStatus(400);
    }
});

candidateRouter.get('/experiencerecord/:experienceDetid', async (req, res, next)=>{
    try{
        let experienceDetid = req.params.experienceDetid;

        if (!experienceDetid) {
            return res.sendStatus(400);
         }

        var experienceRecord =  await candidateController.getExperienceDetById(experienceDetid);
        res.json({ExperienceRecord:experienceRecord});
  
    } catch(e){    
        console.log(e);
        res.json(e);
        //res.sendStatus(400);
    }
});
 
candidateRouter.put('/experiencerecord/:experienceDetid',  async (req, res, next)=>{
    try{

        var CompanyName = req.body.CompanyName;
        var Designation = req.body.Designation;
        var CompanyAddress = req.body.CompanyAddress;
        var StartDate = new Date(req.body.StartDate);
        var EndDate = new Date(req.body.EndDate);
        const experienceDetid = req.params.experienceDetid;

        if (!experienceDetid) {
            return res.sendStatus(400);
         }

        let msg =  await candidateController.updateExperienceDetById(CompanyName, CompanyAddress, Designation, StartDate, EndDate, experienceDetid);
        res.json(msg);
 
    } catch(e){    
        console.log(e);
        res.sendStatus(400);
    }
});

candidateRouter.delete('/experiencerecord/:experienceDetid',  async (req, res, next)=>{
    try{
        var IsActive = 0;//req.body.IsActive;
        const experienceDetid = req.params.experienceDetid;

        let msg =  await candidateController.deleteExperienceDetById(IsActive, experienceDetid);
        res.json(msg);
 
    } catch(e){    
        console.log(e);
        res.sendStatus(400);
    }
});

//==================================================

module.exports = candidateRouter;
 


 
