const router = require('express').Router();
const authControllers = require('../controllers/authControllers');
const { isNotAuthenticated, isAuthenticated } = require('../middlewares/authMiddleware');

const multer = require('multer');
const upload = multer({ dest: 'uploads/foto_profil/' });

router.get('/login', isNotAuthenticated, authControllers.showLoginForm);
router.post('/login', isNotAuthenticated, authControllers.login);

router.get('/register', isNotAuthenticated, authControllers.showRegisterForm);
router.post('/register', isNotAuthenticated, upload.single('foto_profil'), authControllers.register);

router.get('/forgot-password', isNotAuthenticated, authControllers.showForgotPasswordForm);
router.post('/forgot-password', isNotAuthenticated, authControllers.forgotPassword);

router.get('/reset-password/:token', isNotAuthenticated, authControllers.showResetPasswordForm);
router.post('/reset-password', isNotAuthenticated, authControllers.resetPassword);

router.get('/logout', isAuthenticated, authControllers.logout);

module.exports = router;
