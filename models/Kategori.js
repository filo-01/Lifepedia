const db = require('../database/config');

// Fungsi untuk mengambil semua kategori dari database.
function ambilSemuaKategori() {
    return db.prepare('SELECT * FROM kategori ORDER BY id DESC').all();
}

// Fungsi untuk mengambil satu kategori berdasarkan id.
function ambilKategoriById(id) {
    return db.prepare('SELECT * FROM kategori WHERE id = ?').get(id);
}

// Fungsi untuk menambah kategori baru.
function buatKategori(nama_kategori, deskripsi) {
    return db.prepare(`
        INSERT INTO kategori (nama_kategori, deskripsi) 
        VALUES (?, ?)
    `).run(nama_kategori, deskripsi);
}

// Fungsi untuk memperbarui data kategori yang sudah ada.
function updateKategori(id, nama_kategori, deskripsi) {
    return db.prepare(`
        UPDATE kategori 
        SET nama_kategori = ?, deskripsi = ? 
        WHERE id = ?
    `).run(nama_kategori, deskripsi, id);
}

// Fungsi untuk menghapus kategori berdasarkan id.
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
