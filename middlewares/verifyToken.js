const Vendor=require('../model/Vendor');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv')
dotenv.config()
const SecretKey=process.env.SUPERSECRETKEY

const verifyToken=async(req,res,next)=>{
    const token=req.headers.token

    if(!token){
        return res.status(401).json({error:"token is required"})
    }

    try{
        const decoded=jwt.verify(token,SecretKey)

        const vendor=await Vendor.findById(decoded.vendorId)
        
        if(!vendor){
            return res.status(404).json({error:"vendor not found"})
        }

        req.vendorId=vendor._id
        next()


    }catch(err){
        console.error(error)
        return res.status(500).json({error:"Invalid Token"})

    }
}

module.exports=verifyToken