function isAuthenticated(req, res, next) {
    if (req.session && req.session.email) {
        return next();
    } else {
        res.redirect('/auth/login');
    }
}

function isNotAuthenticated(req, res, next) {
    if (req.session && req.session.email) {
        res.redirect('/');
    } else {
        return next();
    }
}

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
