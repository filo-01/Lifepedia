const db = require('../database/config');

function ambilPenggunaById(id) {
    return db.prepare('SELECT * FROM pengguna WHERE id = ?').get(id);
}

function ambilPenggunaByEmail(email) {
    return db.prepare('SELECT * FROM pengguna WHERE email = ?').get(email);
}

function buatPengguna(nama, username, email, password, foto_profil, bio) {
    return db.prepare(`
        INSERT INTO pengguna (nama, username, email, password, foto_profil, bio) 
        VALUES (?, ?, ?, ?, ?, ?)
    `).run(nama, username, email, password, foto_profil, bio);
}

function updateProfil(id, nama, username, bio, foto_profil) {
    return db.prepare(`
        UPDATE pengguna 
        SET nama = ?, username = ?, bio = ?, foto_profil = ?, diperbarui_pada = CURRENT_TIMESTAMP
        WHERE id = ?
    `).run(nama, username, bio, foto_profil, id);
}

module.exports = {
    ambilPenggunaById,
    ambilPenggunaByEmail,
    buatPengguna,
    updateProfil
};
