const verifyToken = require('../middlewares/verifyToken');
const firmController = require('../controllers/firmController')
const express = require('express');
const router = express.Router()

router.post('/add-firm', verifyToken, firmController.addFirm)

module.exports = router

