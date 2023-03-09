
module.exports.authGuard=(req,res,next)=>{
    if(req.session.isConnected)
       return next();
    res.status(403).json({message:"you need to login first"})
}