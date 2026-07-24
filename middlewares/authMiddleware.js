// Middleware untuk memastikan user sudah login sebelum membuka halaman tertentu.
function isAuthenticated(req, res, next) {
    if (req.session && req.session.email) {
        return next();
    } else {
        res.redirect('/auth/login');
    }
}

// Middleware untuk mencegah user yang sudah login membuka halaman login/register lagi.
function isNotAuthenticated(req, res, next) {
    if (req.session && req.session.email) {
        res.redirect('/');
    } else {
        return next();
    }
}

// Middleware untuk mengecek apakah user memiliki peran tertentu.
function authorize(...peran) {
    return (req, res, next) => {
        if (!req.session || !req.session.peran || !peran.includes(req.session.peran)) {
            return res.render('pages/error',
                { pesanError: 'Access Denied : Anda Tidak Memiliki Hak Akses untuk Fitur Ini' });
        }
        next();
    }
}

module.exports = {
    isAuthenticated,
    isNotAuthenticated,
    authorize
}
