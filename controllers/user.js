const express = require('express')
const bcrypt = require('bcrypt');
const User = require('../ models/users');

module.exports.register = async (req,res)=>{
    const {login,pwd}= req.body
    if(!login || !pwd)
        return res.status(400).send({message:"login and pwd are required"})
    let user = await User.findOne({login:login})
    if(user)
        return res.status(400).send({message:"login already exists"})
    
    let hashPwd= await bcrypt.hash(pwd,10);
    
    let newUser = new User({
        login, pwd:hashPwd,todos:[]
    })
    
    newUser.save().then(()=>res.json({message:"register success"}))
    .catch(err=>{
        console.log(err)
        res.status(500).json({message:"please try again later"})
    })
}

module.exports.login = async (req,res)=>{
    const {login,pwd}= req.body
    if(!login || !pwd)
        return res.status(400).send({message:"login and pwd are required"})
    
        let user =await  User.findOne({login:login})
    if(!user)
        return res.status(404).send({message:"not found"})
    if(await bcrypt.compare(pwd,user.pwd))
        {
            req.session.isConnected=true;
            req.session.userId=user.id

            return res.json({message:"success"})
        }
    res.status(400).send({message:"invalid credentiels"})  
}

module.exports.logout = async(req,res)=>{
    req.session.destroy();
    res.send();
}
module.exports.isConnected = async (req,res)=>{
    if(!req.session.isConnected)
        res.json({isConnected:false})
    else
        {
          let user =   await User.findById(req.session.userId)
          res.json({isConnected:true,name:user.login})
        }
}
module.exports.getAll = async (req,res)=>{
    let users = await User.find();
    res.json(users);
}
