const router = require('express').Router();
const courseController = require('../controllers/courseController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',courseController.getAllCourses);
router.post('/',authMiddleware.roleControl(['teacher','admin']),courseController.createCourse);

router.get('/:slug',courseController.getCourse);
router.delete('/:slug',courseController.deleteCourse);
router.put('/:slug',courseController.updateCourse);
router.post('/enroll',courseController.enrollCourse);
router.post('/release',courseController.releaseCourse);

module.exports = router;