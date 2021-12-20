const mongoose = require('mongoose');
const slugify = require('slugify')
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    slug:{
        type:String,
        unique:true
    }
},{collection:'Courses',timestamps:true});

CourseSchema.pre('validate',function(next){
    this.slug = slugify(this.name,{
        lower:true,
        strict:true
    });
    next();
})

const Course = mongoose.model('Course',CourseSchema);

module.exports = Course;