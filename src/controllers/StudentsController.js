const StudentsModel = require('../models/StudentsModel');
const OTPModel = require('../models/OTPModel');
const SendEmailUtility = require('../utility/SendEmailUtility');
const jwt = require('jsonwebtoken');

//Create a new student
exports.createStudent =async (req,res)=>{
    let reqBody = req.body;
    try{
        const result =await StudentsModel.create(reqBody);
        if(result){
            res.status(200).json({status:"success",data:result});
        }
        else{
            res.status(200).json({status:"fail",data:"Something went wrong"});
        }
    }catch (e) {
            res.status(400).json({status:"fail",data:e.toString()});
    }
}
// Select a Student by ID
exports.selectStudentByID = async (req,res)=>{
    let id = req.params.id;
    console.log(id);
    try{
        const result = await StudentsModel.find({_id:id});
        if(result){
            res.status(200).json({status:"success",data:result});
        }
        else{
            res.status(200).json({status:"fail",data:"Something went wrong"});
        }
    }catch (e) {
           res.status(400).json({status:"fail",data:e.toString()});
    }
}
//Select All Students
exports.selectAllStudent = async (req,res)=>{
    try{
        let result = await StudentsModel.find({});
        if(result){
            res.status(200).json({status:"success",data:result});
        }
        else{
            res.status(400).json({status:"fail",data:"Something went wrong"});
        }
    }catch (e) {
        res.status(400).json({status:"fail",data:e.toString()});
    }
}
//Delete a specific student
exports.deleteStudent= async (req,res)=>{
  let id = req.body['id'];
  try{
      let result = await StudentsModel.deleteOne({_id:id});
      if(result){
          res.status(200).json({status:"success",data:result});
      }else{
          res.status(200).json({status:"fail",data:"Something went wrong"});
      }
  }catch (e) {
      res.status(400).json({status:"fail",data:e.toString()});
  }
}
//Update a specific student
exports.updateStudent = async (req,res)=>{
    let id = req.params.id;
    let reqBody=req.body;
    try{
        let result = await StudentsModel.updateOne({_id:id},reqBody,{ runValidators: true })
        if(result){
            res.status(200).json({status:"success",data:result});
        }
        else{
            res.status(200).json({status:"fail",data:"Something went wrong"});
        }
    }catch (e) {
            res.status(400).json({status:"fail",data:e.toString()});
    }
}
//User login by creating jwt token
exports.UserLogin = async (req,res)=>{
    let email = req.body['email'];
    let password = req.body['password'];
    try{
        let result =await StudentsModel.find({
            email:email,password:password});
        if(result.length>0){
            let Payload ={
                exp:Math.floor(Date.now()/1000)+(60*60),
                data:result[0]
            };
            let Token =jwt.sign(Payload,"SecretKey123");
            res.status(200).json({status:"success",Token:Token,data:result[0]});
        }
        else{
            res.status(401).json({status:"fail",data:"Unauthorized"})
        }
    }catch (e) {
            res.status(401).json({status:"fail",data:"Unauthorized"})
    }

}

//Verify Email address and sending OTP
exports.RecoverVerifyEmail=async (req,res)=>{
    let email = req.params.email;
    let OTPCode =Math.floor(100000 + Math.random() * 900000);
    let EmailText="Your Verification Code is ="+OTPCode
    let EmailSubject="Student Management  verification code"
    try {
        let result =await StudentsModel.find({email:email}).count();
        if(result===1){
            //Sending Verification code
            await SendEmailUtility(email,EmailText,EmailSubject);
            //Storing OTP in OTP collection
            await OTPModel.create({email:email,otp:OTPCode});
            res.status(200).json({status:"success",data:"6 digit verification code has been sent to your email account"});
        }
        else{
            res.status(400).json({status:"fail",data:"No User Found"});
        }
    }catch (e) {
            res.status(400).json({status:"fail",data:e.toString()});
    }


}
//OTP Verification and expiry check
exports.VerifyOTP=async (req,res)=>{
    let email=req.body['email'];
    let otp = req.body['otp'];
    let status=0;
    let UpdateStatus = 1;
    try{
        let result=await OTPModel.find({email:email,otp:otp,status:status});
        if(result.length===1){
            //Checking OTP expiry time 5 min

            let currentTime =new Date();
            let OTPCreatedAt = result[0].createdAt;
            let TimeDifferenceMS= currentTime - OTPCreatedAt;
            let OTPExpiryTimeMS =5 * 60 * 1000; //5 min
            if(TimeDifferenceMS<=OTPExpiryTimeMS){
                let UpdatedResult= await OTPModel.updateOne({email:email,otp:otp,status:status},{status:UpdateStatus});
                if(UpdatedResult){
                    res.status(200).json({status:"success",data:"verification successfully completed"});
                }
                else{
                    res.status(400).json({status:"fail",data:"verification failed"});
                }
            }
            else{
                res.status(400).json({status:"fail",data:"OTP Has been expired"});
            }

        }
    }catch (e) {
                res.status(400).json({status:"fail",data:e.toString()});
    }
}

//Update Password after OTP checking

exports.UpdatePassword=async (req,res)=>{
    let NewPassword = req.body['password'];
    let email = req.body['email'];
    let otp = req.body['otp'];
    let status = 1;
    try{
        let CheckingVerifiedOTP = await OTPModel.find({email:email,otp:otp,status:status}).count();
        if(CheckingVerifiedOTP===1){
            let result = await StudentsModel.updateOne({email:email},{password:NewPassword});
            if(result){
                res.status(200).json({status:"success",data:"Password has been updated successfully"});
            }
            else{
                res.status(400).json({status:"fail",data:"Invalid Verification"});
            }
        }
    }catch (e) {
            res.status(400).json({status:"fail",data:e.toString()});
    }
}