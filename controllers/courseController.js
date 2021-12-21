const Course = require('../models/Course');
const Category = require('../models/Category');

const getAllCourses = async (req, res) => {
    try{
        const querySlug = req.query.categories;
        const category = await Category.findOne({slug:querySlug});

        let filter = {};

        if(querySlug){
            filter = {category:category._id};
        }

        const courses = await Course.find(filter);
        const categories = await Category.find();
        res.status(200).render('courses',{
            courses,
            categories,
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