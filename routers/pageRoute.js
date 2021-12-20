const router = require('express').Router();
const pageController = require('../controllers/pageController');

router.get('/',pageController.getIndexPage);
router.get('/about',pageController.getAboutPage);

module.exports = router;