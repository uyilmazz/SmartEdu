const {body} = require('express-validator');

const registerValidate = () => {
    
    return [
        body('name').trim().isLength({min:3}).withMessage('Name must be at least 3 characters'),
        body('email').trim().isEmail().withMessage('Email is not in correct format!'),
        body('password').trim().isLength({min:5}).withMessage('Password must be at least 5 characters'),
    ]

}

const loginValidate = () => {
    return [
        body('email').trim().isEmail().withMessage('Email is not in correct format!'),
        body('password').trim().not().isEmpty().withMessage('Password must not be empty!')
    ]
};

module.exports = {
    registerValidate,
    loginValidate
}