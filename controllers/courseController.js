const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

const getAllCourses = async (req, res) => {
    try{
        const querySlug = req.query.categories;
        const querySearch = req.query.search;
        const category = await Category.findOne({slug:querySlug});
    
        let filter = {};

        if(querySlug){
            filter = {category:category._id};
        }

        if(querySearch){
            filter = {name:querySearch};
        }

        if(!querySlug && !querySearch){
            filter.name = '';
            filter.category = null;
        }

        const courses = await Course.find({
            $or:[
                {name:{$regex:'.*' + filter.name + '.*', $options:'i'}},
                {category:filter.category}
            ]
        }).populate('user').sort('-createdAt');
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
        const courseUser = await User.findById(course.user);
        const currentUser = await User.findById(req.session.userID);
        const categories = await Category.find();
        res.status(200).render('course',{
            pageName:'courses',
            course,
            courseUser,
            currentUser,
            categories
        })
    }catch(err){
        res.status(400).json({
            status:'error',
            err
        });
    }
};

// TODO existing course check
const createCourse = async (req, res) => {
    try {
        const course = await Course.create({
            name:req.body.name,
            description:req.body.description,
            category:req.body.category,
            user:req.session.userID
        });
        req.flash('success_message',[{msg:`${course.name} has been created succesfully`}]);
        res.status(201).redirect('/courses');
    } catch (err) {
        req.flash('validation_error',[{msg:'Something happened!'}]);
        res.redirect('/courses');
    }
};

const enrollCourse = async(req,res) => {
    try{
        const user = await User.findById(req.session.userID);
        await user.courses.push(req.body.courseID);
        await user.save();
        req.flash('success_message',[{msg:'Successfully registered for the course.'}])
        res.status(201).redirect('/users/dashboard');
    }catch(err){
        req.flash('validation_error',[{msg:'Something happened!'}]);
        res.status(400).redirect('/users/dashboard');
    }
};

const releaseCourse = async(req,res) => {
    try{
        const user = await User.findById(req.session.userID);
        await user.courses.pull(req.body.courseID);
        await user.save();
        req.flash('success_message',[{msg:`Course has been released succesfully`}]);
        res.status(201).redirect('/users/dashboard');
    }catch(err){
        req.flash('validation_error',[{msg:'Something happened!'}]);
        res.status(400).redirect('/users/dashboard');
    }
};

const deleteCourse = async(req,res) => {
    try{   
        const paramSlug = req.params.slug;
        const result = await Course.findOneAndDelete({slug:paramSlug});
        if(result){
            req.flash('success_message',[{msg:'Course has been deleted successfully'}]);
            res.redirect('/users/dashboard');
        }else{
            req.flash('validation_error',[{msg:'Course could not be deleted'}]);
            res.redirect('/users/dashboard');
        }

    }catch(err){
        req.flash('validation_error',[{msg:'Something error!'}]);
        res.redirect('/users/dashboard');
    }
}

const updateCourse = async(req,res) =>{
    try{
        const name = req.body.name;
        const description = req.body.description;
        const category = req.body.category;
        const course = await Course.findOneAndUpdate({slug:req.params.slug},{name,description,category},{new:true});
        if(course){
            req.flash('success_message',[{msg:'Course has been updated successfully'}]);
            res.redirect('/users/dashboard');
        }else{
            req.flash('validation_error',[{msg:'Could could not be updated'}]);
            res.redirect('/users/dashboard');
        }

    }catch(err){
        req.flash('validation_error',[{msg:'Something happened!'}]);
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourse,
    enrollCourse,
    releaseCourse,
    deleteCourse,
    updateCourse
}