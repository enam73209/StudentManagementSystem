const StudentsModel = require('../models/StudentsModel');
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