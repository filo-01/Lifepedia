const router = require('express').Router();
const tutorialControllers = require('../controllers/tutorialControllers');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const multer = require('multer');
const upload = multer({ dest: 'uploads/tutorial/' });

// Menampilkan daftar tutorial.
router.get('/list', tutorialControllers.listTutorial);
// Menampilkan detail tutorial berdasarkan id.
router.get('/detail/:id', tutorialControllers.showDetailTutorial);

// Menampilkan form pembuatan tutorial baru.
router.get('/create', isAuthenticated, tutorialControllers.showCreateTutorialForm);
// Memproses pembuatan tutorial baru beserta upload file.
router.post('/create', isAuthenticated, upload.single('isi'), tutorialControllers.createTutorial);

// Menampilkan form edit tutorial berdasarkan id.
router.get('/edit/:id', isAuthenticated, tutorialControllers.showEditTutorialForm);
// Memproses pembaruan tutorial beserta upload file.
router.post('/edit/:id', isAuthenticated, upload.single('isi'), tutorialControllers.editTutorial);

// Menghapus tutorial berdasarkan id.
router.post('/delete/:id', isAuthenticated, tutorialControllers.deleteTutorial);

module.exports = router;