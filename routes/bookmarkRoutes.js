const router = require('express').Router();
const bookmarkControllers = require('../controllers/bookmarkControllers');
const { isAuthenticated } = require('../middlewares/authMiddleware');

// Menampilkan daftar tutorial yang disimpan pengguna.
router.get('/list', isAuthenticated, bookmarkControllers.listBookmark);
// Menambahkan tutorial ke daftar bookmark.
router.post('/add/:tutorialId', isAuthenticated, bookmarkControllers.addBookmark);
// Menghapus tutorial dari daftar bookmark.
router.post('/delete/:id', isAuthenticated, bookmarkControllers.deleteBookmark);

module.exports = router;
