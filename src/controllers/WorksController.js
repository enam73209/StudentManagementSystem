const WorksModel = require('../models/WorksModel');
const e = require("express");
//Create a work by the authorized user
exports.createWork=async (req,res)=>{
    let title = req.body['title'];
    let classNote=req.body['classNote'];
    let description =req.body['description'];
    let status = req.body['status'];
    let email = req.headers['email'];
    const postBody={
        title:title,
        classNote:classNote,
        description:description,
        status:status,
        email:email
    };
    try{
        let result = await WorksModel.create(postBody);
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

//Select all works by the authorized  user

exports.selectAllWorks=async (req,res)=>{
    let email = req.headers['email'];

    try{
        const result =await WorksModel.find({email:email});
        console.log(result);
        if(result){
            res.status(200).json({status:"success",data:result});
        }
        else{
            res.status(400).json({status:"success",data:"Something went wrong"});
        }
    }catch (e){
            res.status(400).json({status:"success",data:e.toString()});
    }
}

//Select a specific work filtering with id  by the authorized  user
exports.selectWorksByID=async (req,res)=>{
    let email = req.headers['email'];
    let id = req.params.id;
    console.log(id);
    try{
        const result = await WorksModel.find({_id:id,email:email})
        if(result){
            res.status(200).json({status:"success",data:result});
        }
        else{
            res.status(400).json({status:"success",data:"Something went wrong"});
        }
    }catch (e){
            res.status(400).json({status:"success",data:e.toString()});
    }
}

//delete a specific work by the authorized user
exports.deleteWork=async (req,res)=>{
    let email = req.headers['email'];
    let id = req.body['id'];
    console.log(id);
    try{
        const result = await WorksModel.deleteOne({_id:id,email:email});
        if(result){
            res.status(200).json({status:"success",data:result});
        }
        else{
            res.status(400).json({status:"success",data:"Something went wrong"});
        }
    }catch (e) {
        res.status(400).json({status:"success",data:e.toString()});
    }
}