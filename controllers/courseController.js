const Course = require('../models/Course');

const getAllCourses = async (req, res) => {
    try{
        const courses = await Course.find();
        res.status(200).render('courses',{
            courses,
            pageName : 'courses'
        })
    }catch(err){
        res.status(400).json({
            status:'error',
            err
        });
    }
};

const getCourse = async(req,res) =>{
    try{
        const course = await Course.findOne({slug:req.params.slug});
        res.status(200).render('course',{
            pageName:'courses',
            course
        })
    }catch(err){
        res.status(400).json({
            status:'error',
            err
        });
    }
};

const createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({
            status: 'success',
            course
        });
    } catch (err) {
        res.status(400).json({
            status: 'error',
            err
        });
    }
}

module.exports = {
    createCourse,
    getAllCourses,
    getCourse,

}