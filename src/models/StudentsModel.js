const mongoose =require('mongoose');
const DataSchema = mongoose.Schema({
    email:{type:String,unique:true,
        validate: {
            validator:(value)=>{
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
            },
            message: "Invalid Email Address"
        }
    },
    firstName:{type:String},
    lastName:{type:String},
    mobile:{type:String,unique: true,
        validate:{
            validator:(value)=>{
                return /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/.test(value);
            },
            message:"Invalid Bangladeshi Mobile Number"
        }
    },
    password:{type:String},
    address:{type:String},
    roll:{type:String},
    class:{type:String}
},{versionKey:false});
const StudentsModel =mongoose.model('student',DataSchema);
module.exports = StudentsModel;
