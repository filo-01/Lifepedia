const router = require('express').Router();
const authControllers = require('../controllers/authControllers');
const { isNotAuthenticated, isAuthenticated } = require('../middlewares/authMiddleware');

const multer = require('multer');
const upload = multer({ dest: 'uploads/foto_profil/' });

// Menampilkan halaman login.
router.get('/login', isNotAuthenticated, authControllers.showLoginForm);
// Memproses data login pengguna.
router.post('/login', isNotAuthenticated, authControllers.login);

// Menampilkan halaman registrasi.
router.get('/register', isNotAuthenticated, authControllers.showRegisterForm);
// Memproses pendaftaran akun baru beserta upload foto profil.
router.post('/register', isNotAuthenticated, upload.single('foto_profil'), authControllers.register);

// Menampilkan halaman lupa password.
router.get('/forgot-password', isNotAuthenticated, authControllers.showForgotPasswordForm);
// Memproses permintaan reset password.
router.post('/forgot-password', isNotAuthenticated, authControllers.forgotPassword);

// Menampilkan halaman untuk membuat password baru berdasarkan token.
router.get('/reset-password/:token', isNotAuthenticated, authControllers.showResetPasswordForm);
// Memproses penyimpanan password baru.
router.post('/reset-password', isNotAuthenticated, authControllers.resetPassword);

// Mengakhiri sesi pengguna dan keluar dari aplikasi.
router.get('/logout', isAuthenticated, authControllers.logout);

module.exports = router;
