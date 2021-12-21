const User = require('../models/User');

const signInControl = async (req, res, next) => {
    try {
        const user = await User.findById(req.session.userID);
        if (user) {
            next();
        } else {
            res.redirect('/login');
        }
    } catch (err) {
        res.json({
            message:err
        });
    }
}

const signOutControl = async(req,res,next) => {
    try{
        const user = await User.findById(req.session.userID);
        if(!user){
            next();
        }else{
            res.redirect('/');
        }
    }catch(err){
        res.json({
            message:err
        });
    }   
}

const roleControl = (roles) => {
    return async(req,res,next) =>{
        if(roles.includes(req.body.role)){
            next();
        }else{
            // res.redirect('/');
            res.status(401).json({
                message:'You are not authorized for this operation!'
            });
        }
    }
}

module.exports = {
    signInControl,
    signOutControl,
    roleControl
}