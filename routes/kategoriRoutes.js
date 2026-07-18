const router = require('express').Router();
const kategoriControllers = require('../controllers/kategoriControllers');
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/list', kategoriControllers.listKategori);

router.get('/create', isAuthenticated, kategoriControllers.showCreateForm);
router.post('/create', isAuthenticated, kategoriControllers.createKategori);

router.get('/edit/:id', isAuthenticated, kategoriControllers.showEditForm);
router.post('/edit/:id', isAuthenticated, kategoriControllers.editKategori);

router.post('/delete/:id', isAuthenticated, kategoriControllers.deleteKategori);

module.exports = router;
