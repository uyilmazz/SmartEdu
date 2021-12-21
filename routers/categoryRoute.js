const router = require('express').Router();
const categoryController = require('../controllers/categoryController');

router.post('/',categoryController.createCategory);

module.exports = router;