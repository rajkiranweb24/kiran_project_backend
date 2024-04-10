const vendroController=require('../controllers/vendorController');
const express=require('express');

const router=express.Router()

router.post('/register', vendroController.venderRegister)
router.post('/login',vendroController.vendorLogin)
module.exports=router

