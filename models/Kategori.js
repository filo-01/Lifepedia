const db = require('../database/config');

function ambilSemuaKategori() {
    return db.prepare('SELECT * FROM kategori ORDER BY id DESC').all();
}

function ambilKategoriById(id) {
    return db.prepare('SELECT * FROM kategori WHERE id = ?').get(id);
}

function buatKategori(nama_kategori, deskripsi) {
    return db.prepare(`
        INSERT INTO kategori (nama_kategori, deskripsi) 
        VALUES (?, ?)
    `).run(nama_kategori, deskripsi);
}

function updateKategori(id, nama_kategori, deskripsi) {
    return db.prepare(`
        UPDATE kategori 
        SET nama_kategori = ?, deskripsi = ? 
        WHERE id = ?
    `).run(nama_kategori, deskripsi, id);
}

function hapusKategori(id) {
    return db.prepare('DELETE FROM kategori WHERE id = ?').run(id);
}

module.exports = {
    ambilSemuaKategori,
    ambilKategoriById,
    buatKategori,
    updateKategori,
    hapusKategori
};
