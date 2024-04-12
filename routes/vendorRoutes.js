const vendroController = require('../controllers/vendorController');
const express = require('express');

const router = express.Router()

router.post('/register', vendroController.venderRegister)
router.post('/login', vendroController.vendorLogin)
router.get('/all-vendors',vendroController.getAllVendors)
router.get('/single-vendor/:id',vendroController.getVendor)
module.exports = router

