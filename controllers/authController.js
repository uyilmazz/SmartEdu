const User = require("../models/User");
const session = require('express-session');
const bcrypt = require('bcrypt');

const createUser = async(req,res) =>{
    try{
        const user = await User.create(req.body);
        if(user){
            res.status(201).redirect('/login');
        }else{
            res.status(400).json({
                message:'Error occurred during user creation'
            });
        }
    }catch(err){
        res.status(400).json({
            status:'error',
            err
        });
    }
};

const loginUser = async(req,res) => {
    try{
        const {email,password} = req.body;

        const user = await User.findOne({email});
        if(user){

            const result = await bcrypt.compare(password,user.password);

            if(result){
                req.session.userID = user._id;
                res.status(400).redirect('/users/dashboard');
            }else{
                res.json({
                    message:'Şifre uyuşmuyor'
                });
            }
        }else{
            res.json({
                message:'email kayıtlı değil'
            });
        }

    }catch(err){
        res.status(400).json({
            status:'error',
            err
        });
    }
}

const logoutUser = (req,res) =>{
    req.session.destroy(() => {
        res.redirect('/');
    });
}

const getDashboardPage = async(req,res) => {
    try{
        const user = await User.findById(req.session.userID);
        res.status(200).render('dashboard',{
            pageName:'dashboard',
            user
        })
    }catch(err){
        res.json({
            message:'error',
            err
        })
    }
};

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getDashboardPage
}