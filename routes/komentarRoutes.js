const router = require('express').Router();
const komentarControllers = require('../controllers/komentarControllers');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.post('/create/:tutorial_id', isAuthenticated, komentarControllers.createKomentar);

router.post('/delete/:id/:tutorial_id', isAuthenticated, komentarControllers.deleteKomentar);

module.exports = router;