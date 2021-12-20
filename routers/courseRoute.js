const router = require('express').Router();
const courseController = require('../controllers/courseController');

router.get('/',courseController.getAllCourses);
router.post('/',courseController.createCourse);

router.get('/:slug',courseController.getCourse);

module.exports = router;