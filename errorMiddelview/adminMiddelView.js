



const admin=(req,res,next)=>{

if(req.user && !req.user.isAdmin){
    return res.status(403).json({
        mesaj:"Bu işlemi Yapmaya yetkiniz yok"
    })
}else{
    next();
}

}

module.exports=admin;