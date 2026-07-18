require('dotenv').config();

const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const session = require('express-session');

const authRoutes = require('./routes/authRoutes');
const kategoriRoutes = require('./routes/kategoriRoutes');
const bookmarkRoutes = require('./routes/bookmarkRoutes');
const tutorialRoutes = require('./routes/tutorialRoutes');
const penggunaRoutes = require('./routes/penggunaRoutes');
const komentarRoutes = require('./routes/komentarRoutes');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'default-secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 1000
    }
}));

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

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
});

app.use('/bootstrap',
    express.static(path.join(__dirname, 'node_modules/bootstrap/dist'))
);

app.use('/uploads',
    express.static(path.join(__dirname, 'uploads'))
);

app.get('/', (req, res) => {
    res.redirect('/tutorial/list');
});

app.use('/auth', authRoutes);
app.use('/kategori', kategoriRoutes);
app.use('/tutorial', tutorialRoutes);
app.use('/bookmark', bookmarkRoutes);
app.use('/pengguna', penggunaRoutes);
app.use('/komentar', komentarRoutes);

app.listen(3000, () => {
    console.log('Server berjalan di http://localhost:3000');
});