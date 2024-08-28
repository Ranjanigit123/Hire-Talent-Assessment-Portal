const express =require('express');
const apiRouter = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const cookieParser = require('cookie-parser');
apiRouter.use(cookieParser());

const candidateController = require('../controllers/candidate.controller.js');
const employerController = require('../controllers/employer.controller.js');
const candidaterouter = require('./candidaterouter.js');
const employerrouter = require('./employerrouter.js');


apiRouter.post('/registerCandidate', async (req, res, next)=>{
    try{

        var Emailid = req.body.Emailid;
        var pwd = req.body.password;
        var IsCandidate = req.body.IsCandidate;
        const loginCandidateId =  await candidateController.insertLogindetails(Emailid, pwd, IsCandidate);

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
        var Logindetails_id = loginCandidateId;

              if (!Firstname || !Lastname || !DOB ||!Logindetails_id) {
                return res.sendStatus(400);
             }
  
            // const salt = genSaltSync(10);
            // pwd = hashSync(pwd, salt);
  
        const createsCandidateId =  await candidateController.insertCandidate(Firstname, Lastname, DOB, ContactAddress, City, State, Pincode, Country, Emailid, Contactnumber, Whatsupnumber, Logindetails_id);

        /*const jsontoken = getToken(user, res);
        res.json({token: jsontoken});*/
        //res.json({message:"Candidate Record Sucessfully created..."+createsCandidateId});
        res.json({"createsCandidateId" : createsCandidateId});
            //return res.redirect('/mainpage');
  
    } catch(e){    
        console.log(e);
        res.json(e);
        //res.sendStatus(400);
    }
});

apiRouter.post('/registerEmployer', async (req, res, next)=>{
    try{

        var Emailid = req.body.Emailid;
        var pwd = req.body.Password;
        var IsCandidate = req.body.IsCandidate;
        const loginEmployerId =  await candidateController.insertLogindetails(Emailid, pwd, IsCandidate);
      
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
        var Logindetails_id = loginEmployerId;
 

            if (!OrganisationName || !CommencementDate ||!loginEmployerId) {
                return res.sendStatus(400);
            }

            // const salt = genSaltSync(10);
            // pwd = hashSync(pwd, salt);
  
        const createEmployerId =  await employerController.insertEmployer(OrganisationName, BusinessSector, Cerificate1, Cerificate2, Cerificate3, Website, Emailid, CommencementDate, ContactAddress, SizeofEmp, City, State, Pincode, Country, Contactnumber, Logindetails_id);

        /*const jsontoken = getToken(user, res);
        res.json({token: jsontoken});*/
        res.json({"createEmployerId" : createEmployerId});
 
            //return res.redirect('/mainpage');
  
    } catch(e){    
        console.log(e);
        res.json(e);
        //res.sendStatus(400);
    }
});

apiRouter.post('/login', async(req, res, next)=>{
    try{
        const email = req.body.emailid;
        const pwd = req.body.password;
        const IsCandidate = req.body.iscandidate;
        
        if(IsCandidate)
            user = await candidateController.getCandidateByEmail(email);
        else 
            user = await employerController.getEmployerByEmail(email);
        
        
        if(!user){
            return res.json({
                message: "Invalid email or pwd"
            })
        }
    
        if(email == user.Emailid && pwd == user.pwd)
        {
            return res.json(user);
        }
        else
        {
            return res.json({
                message: "Invalid password.."
            });
        }
    
    } catch(e){
        console.log(e);
    }
});

apiRouter.use('/candidate', verifyCandidate, candidaterouter);
apiRouter.use('/employer', verifyEmployer, employerrouter);

 //  Verify Candidate
 async function  verifyCandidate  (req, res, next){
     next();
 }

 //Verify Employer
 async function  verifyEmployer  (req, res, next){
    next();
}

 /*
 //  Verify Token
async function  verifyCandidate  (req, res, next){
    
    //const token=req.cookies.token;
    const token = req.body.token;
     console.log(token);
      
     if(token === undefined  ){
        //next(new Error('Authentication Failed'));
             return res.json({
                 message: "Access Denied! Unauthorized User"
               });
     } else{
  
         jsonwebtoken.verify(token, process.env.SECRET_KEY, (err, authData)=>{
             if(err){
                //next(new Error('Missing Authentication Token'));
                 res.json({
                     message: "Invalid Token..."
                   });
  
             } else{
                 
                console.log(authData.user.email);
                console.log(authData.user.name);
                next();
                //return res.json(authData.user);
                
                // const role = authData.user.name;
                // if(role === "admin"){
  
                //  next();
                // } else{
                //     return res.json({
                //         message: "Access Denied! you are not an Admin"
                //       });
  
                // } 
             }
         })
     } 
 }
 
*/

module.exports = apiRouter;