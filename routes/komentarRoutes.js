const router = require('express').Router();
const komentarControllers = require('../controllers/komentarControllers');
const { isAuthenticated } = require('../middlewares/authMiddleware');

// Menambahkan komentar pada tutorial tertentu.
router.post('/create/:tutorial_id', isAuthenticated, komentarControllers.createKomentar);

// Menghapus komentar berdasarkan id dan tutorial terkait.
router.post('/delete/:id/:tutorial_id', isAuthenticated, komentarControllers.deleteKomentar);

module.exports = router;