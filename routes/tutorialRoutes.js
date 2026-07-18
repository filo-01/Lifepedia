const router = require('express').Router();
const tutorialControllers = require('../controllers/tutorialControllers');
const { isAuthenticated } = require('../middlewares/authMiddleware');

const multer = require('multer');
const upload = multer({ dest: 'uploads/tutorial/' });

router.get('/list', tutorialControllers.listTutorial);
router.get('/detail/:id', tutorialControllers.showDetailTutorial);

router.get('/create', isAuthenticated, tutorialControllers.showCreateTutorialForm);
router.post('/create', isAuthenticated, upload.single('isi'), tutorialControllers.createTutorial);

router.get('/edit/:id', isAuthenticated, tutorialControllers.showEditTutorialForm);
router.post('/edit/:id', isAuthenticated, upload.single('isi'), tutorialControllers.editTutorial);

router.post('/delete/:id', isAuthenticated, tutorialControllers.deleteTutorial);

module.exports = router;