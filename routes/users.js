const express = require('express');

const { register,getAll, login, logout, isConnected } = require('../controllers/user');

const router = express.Router();
router.get('/',getAll)
router.post("/register",register)
    
router.post("/login",login)

router.get("/logout",logout)
router.get("/isConnected",isConnected)

module.exports = router
