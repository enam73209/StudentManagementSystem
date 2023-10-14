const StudentsModel = require('../models/StudentsModel');
exports.createStudent =async (req,res)=>{
    let reqBody = req.body;
    console.log(reqBody);
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

exports.selectStudent = async (req,res)=>{
    try{
        let result = await StudentsModel.find({});
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