const router = require('express').Router();
const pageController = require('../controllers/pageController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/',pageController.getIndexPage);
router.get('/about',pageController.getAboutPage);
router.get('/register',authMiddleware.signOutControl,pageController.getRegisterPage);
router.get('/login',authMiddleware.signOutControl,pageController.getLoginPage);
router.get('/contact',pageController.getContactPage);
router.post('/contact',pageController.sendEmail);

module.exports = router;