const router = require('express').Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',courseController.getAllCourses);
router.post('/',authMiddleware.roleControl(['teacher','admin']),courseController.createCourse);

router.get('/:slug',courseController.getCourse);

module.exports = router;