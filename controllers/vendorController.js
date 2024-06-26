const Vendor = require('../model/Vendor')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const dotenv = require("dotenv")
dotenv.config()
const secretKey = process.env.SUPERSECRETKEY

const venderRegister = async (req, res) => {
    const { username, email, password } = req.body
    try {

        const vendorEmail = await Vendor.findOne({ email });
        if (vendorEmail) {
            res.status(400).json(
                "email already taken")
        }
        const hashedPassword = await bcrypt.hash(password, 10)

        const newVendor = new Vendor({
            username,
            email,
            password: hashedPassword
        })


        await newVendor.save()
        res.status(201).json({ message: "vendor registered success" })
        console.log("registered")
    }
    catch (err) {
        console.error("err", err)
        res.status(500).json({ error: "internal server error" })

    }

}

const vendorLogin = async (req, res) => {
    const { email, password } = req.body

    try {

        const vendor = await Vendor.findOne({ email })
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ status: "email and password no correct" })
        }
        const token = jwt.sign({ vendorId: vendor._id }, secretKey, { expiresIn: "1h" })
        return res.status(200).json({ status: "Login Successfully", token: token })

    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error" })
    }

}

const getAllVendors=async (req,res)=>{
    try{
        const vendors=await Vendor.find().populate('firm')
       return  res.json({vendors})

    }catch(err){
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error" })
    }

}

const getVendor=async(req,res)=>{
  const vendorId=req.params.id
    try{
        const vendor=await Vendor.findById({_id:vendorId})
        if(!vendor){
       
        return res.status(404).json({ error: "vendor not found" })

        }
        console.log(vendor)
       return  res.json(vendor)
       
    }catch(err){
        console.log(err)
        return res.status(500).json({ error: "Internal Server Error" })

    }
   
}
module.exports = {
    venderRegister,
    vendorLogin,
    getAllVendors,
    getVendor
}