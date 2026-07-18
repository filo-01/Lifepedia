const router = require('express').Router();
const bookmarkControllers = require('../controllers/bookmarkControllers');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/list', isAuthenticated, bookmarkControllers.listBookmark);
router.post('/add/:tutorialId', isAuthenticated, bookmarkControllers.addBookmark);
router.post('/delete/:id', isAuthenticated, bookmarkControllers.deleteBookmark);

module.exports = router;
