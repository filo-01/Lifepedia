const router = require('express').Router();
const penggunaControllers = require('../controllers/penggunaControllers');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const multer = require('multer');
const upload = multer({ dest: 'uploads/foto_profil/' });

// Menampilkan halaman profil pengguna.
router.get('/profil', isAuthenticated, penggunaControllers.showProfil);

// Menampilkan form edit profil pengguna.
router.get('/edit', isAuthenticated, penggunaControllers.showEditProfilForm);
// Memproses pembaruan profil beserta upload foto profil.
router.post('/edit', isAuthenticated, upload.single('foto_profil'), penggunaControllers.editProfil);

module.exports = router;
