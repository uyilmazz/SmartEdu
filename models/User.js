const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['student','teacher','admin'],
        default:'student'
    }

},{collection:'Users',timestamps:true});

UserSchema.pre('save',function(next){
    const user = this;
    bcrypt.hash(user.password,10,(err,hash) => {
        user.password = hash,
        next();
    });
});

const User = mongoose.model('Users',UserSchema);

module.exports = User;