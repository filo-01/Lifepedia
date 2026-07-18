const router = require('express').Router();
const penggunaControllers = require('../controllers/penggunaControllers');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const multer = require('multer');
const upload = multer({ dest: 'uploads/foto_profil/' });

router.get('/profil', isAuthenticated, penggunaControllers.showProfil);

router.get('/edit', isAuthenticated, penggunaControllers.showEditProfilForm);
router.post('/edit', isAuthenticated, upload.single('foto_profil'), penggunaControllers.editProfil);

module.exports = router;
