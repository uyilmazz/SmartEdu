const router = require('express').Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/signup',authController.createUser);
router.post('/login',authController.loginUser);
router.get('/logout',authController.logoutUser);
router.get('/dashboard',authMiddleware.signInControl,authController.getDashboardPage);

module.exports = router;