const session = require('express-session');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const User = require("../models/User");
const Category = require('../models/Category');
const Course = require('../models/Course');

const createUser = async (req, res) => {
    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            req.flash('validation_error', errors.array());
            req.flash('name', req.body.name);
            req.flash('email', req.body.email);
            req.flash('password', req.body.password);
            res.redirect('/register');
        } else {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                req.flash('validation_error', [{ msg: 'This email already in use' }]);
                req.flash('name', req.body.name);
                req.flash('email', req.body.email);
                req.flash('password', req.body.password);
                res.redirect('/register');
            } else {
                const user = await User.create(req.body);
                if (user) {
                    req.flash('success_message', [{ msg: 'You have successfully registered.' }])
                    res.status(201).redirect('/login');
                } else {
                    res.status(400).json({
                        message: 'Error occurred during user creation'
                    });
                }
            }
        }
    } catch (err) {
        res.status(400).json({
            status: 'error',
            err
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            req.flash('validation_error', errors.array());
            req.flash('email', email);
            req.flash('password', password);
            res.redirect('/login');
        } else {
            const user = await User.findOne({ email });
            if (user) {
                const result = await bcrypt.compare(password, user.password);
                if (result) {
                    req.session.userID = user._id;
                    res.status(400).redirect('/users/dashboard');
                } else {
                    req.flash('validation_error', [{ msg: 'Email or Password is not correct!' }]);
                    req.flash('email', email);
                    req.flash('password', password);
                    res.redirect('/login')
                }
            } else {
                req.flash('validation_error', [{ msg: 'Email or Password is not correct!' }]);
                req.flash('email', email);
                req.flash('password', password);
                res.redirect('/login')
            }
        }
    } catch (err) {
        res.status(400).json({
            status: 'error',
            err
        });
    }
};

const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

const getDashboardPage = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID).populate('courses');
        const categories = await Category.find();
        const courses = await Course.find({ user: req.session.userID }).sort('-createdAt');
        const users = await User.find();
        res.status(200).render('dashboard', {
            pageName: 'dashboard',
            user,
            courses,
            users,
            categories
        })
    } catch (err) {
        res.json({
            message: 'error',
            err
        })
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user.role == 'student') {
            await User.findByIdAndDelete(req.params.id);
        } else if (user.role == 'teacher') {
            await User.findByIdAndDelete(req.params.id);
            await Course.deleteMany({ user: req.params.id });
        }
        req.flash('success_message', [{ msg: 'User has been deleted successfully' }]);
        res.redirect('/users/dashboard');

    } catch (err) {
        req.flash('validation_error', [{ msg: 'Something happened!' }]);
        res.redirect('/users/dashboard');
    }

};

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getDashboardPage,
    deleteUser
}