const router = require('express').Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const validationMidlleware = require('../middlewares/validationMiddleware');

router.post('/signup',validationMidlleware.registerValidate(),authController.createUser);
router.post('/login',validationMidlleware.loginValidate(),authController.loginUser);
router.delete('/:id',authController.deleteUser);
router.get('/logout',authController.logoutUser);
router.get('/dashboard',authMiddleware.signInControl,authController.getDashboardPage);

module.exports = router;