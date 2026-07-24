// Memuat variabel environment dari file .env agar konfigurasi aman dan fleksibel.
require('dotenv').config();

// Mengimpor modul utama untuk membuat aplikasi web Express.
const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session');

// Menghubungkan route-route aplikasi agar URL bisa diproses sesuai fitur.
const authRoutes = require('./routes/authRoutes');
const kategoriRoutes = require('./routes/kategoriRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const tutorialRoutes = require('./routes/tutorialRoutes');
const penggunaRoutes = require('./routes/penggunaRoutes');
const komentarRoutes = require('./routes/komentarRoutes');

// Membuat objek aplikasi Express.
const app = express();

// Mengizinkan aplikasi menerima data form dari browser.
app.use(express.urlencoded({ extended: true }));

// Mengaktifkan session agar data login dan user state bisa disimpan sementara.
app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 1000
    }
}));

// Mengatur template engine Handlebars untuk menampilkan halaman HTML dinamis.
app.engine('hbs', engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    helpers: {

        inc(value) {
            return parseInt(value) + 1;
        },

        eq(a, b, options) {
            const hasil = String(a) === String(b);

            if (options && typeof options.fn === "function") {
                return hasil ? options.fn(this) : options.inverse(this);
            }

            return hasil;
        },

        isSelected(a, b) {
            return String(a) === String(b) ? "selected" : "";
        }

    }
}));

// Menentukan folder view dan ekstensi template yang dipakai.
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Membuat session tersedia di semua halaman agar bisa dipakai oleh view.
app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

// Menyediakan file statis dari folder Bootstrap agar halaman bisa memakai CSS/JS.
app.use('/bootstrap',
    express.static(path.join(__dirname, 'node_modules/bootstrap/dist'))
);

// Menyediakan file upload gambar agar bisa diakses lewat browser.
app.use('/uploads',
    express.static(path.join(__dirname, 'uploads'))
);

// Redirect halaman utama ke halaman daftar tutorial.
app.get('/', (req, res) => {
    res.redirect('/tutorial/list');
});

// Mendaftarkan semua route berdasarkan fitur aplikasi.
app.use('/auth', authRoutes);
app.use('/kategori', kategoriRoutes);
app.use('/tutorial', tutorialRoutes);
app.use('/bookmark', bookmarkRoutes);
app.use('/pengguna', penggunaRoutes);
app.use('/komentar', komentarRoutes);

// Menentukan port server, defaultnya 3000.
const PORT = process.env.PORT || 3000;

// Menjalankan server dan menampilkan pesan di console.
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
});