const Category = require('../models/Category');

const createCategory = async(req,res) => {
    try{
        const category = await Category.create(req.body);
        res.status(201).json({
            status:'success',
            category
        })
    }catch(err){
        res.status(400).json({
            status: 'error',
            err
        });
    }
};

module.exports = {
    createCategory,
}