const router = require('express').Router();
const kategoriControllers = require('../controllers/kategoriControllers');
const { isAuthenticated } = require('../middlewares/authMiddleware');

// Menampilkan daftar kategori.
router.get('/list', kategoriControllers.listKategori);

// Menampilkan form pembuatan kategori baru.
router.get('/create', isAuthenticated, kategoriControllers.showCreateForm);
// Memproses pembuatan kategori baru.
router.post('/create', isAuthenticated, kategoriControllers.createKategori);

// Menampilkan form edit kategori berdasarkan id.
router.get('/edit/:id', isAuthenticated, kategoriControllers.showEditForm);
// Memproses pembaruan kategori.
router.post('/edit/:id', isAuthenticated, kategoriControllers.editKategori);

// Menghapus kategori berdasarkan id.
router.post('/delete/:id', isAuthenticated, kategoriControllers.deleteKategori);

module.exports = router;
