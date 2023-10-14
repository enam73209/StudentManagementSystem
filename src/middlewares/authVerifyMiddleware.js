const jwt = require('jsonwebtoken');
module.exports=(req,res,next)=>{
    const token  = req.headers['token'];
    jwt.verify(token,"SecretKey123",(err,decoded)=>{
        if(err){
            res.status(401).json({status:"fail", data:"Unauthorized"});
        }
        else{
            let user_email = decoded['data']['email'];
            req.headers.email = user_email;
            next()
        }
    })
}