const Vendor=require('../model/vendor')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')


const venderRegister=async (req,res)=>{
    const {username,email,password}=req.body
    try{

        const vendorEmail=await Vendor.findOne({email});
        if(vendorEmail){
            res.status(400).json(
                "email already taken")
        }
        const hashedPassword=await bcrypt.hash(password,10)

        const newVendor=new Vendor({
            username,
            email,
            password:hashedPassword
        })


        await newVendor.save()
        res.status(201).json({message:"vendor registered success"})
       console.log("registered")
    }
    catch(err){
        console.error("err",err)
        res.status(500).json({error:"internal server error"})

    }

}

const vendorLogin=async(req,res)=>{
    const {email,password}=req.body

    const vendor=await Vendor.findOne({email})
    if(!vendor || ! (await bcrypt.compare(password,vendor.password)) ){
       return  res.status(401).json({status:"email and password no correct"})
    }
   return  res.status(200).json({status:"Login Successfully"})
}
module.exports={
    venderRegister,
    vendorLogin
}