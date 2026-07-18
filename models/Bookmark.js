const db = require('../database/config');

function ambilBookmarkOlehPengguna(penggunaId) {
    return db.prepare(`
        SELECT b.id AS bookmark_id, t.id AS tutorial_id, t.judul, t.deskripsi, 
               k.nama_kategori, p.username, p.foto_profil, t.dibuat_pada
        FROM bookmark b
        JOIN tutorial t ON b.tutorial_id = t.id
        JOIN kategori k ON t.kategori_id = k.id
        JOIN pengguna p ON t.pengguna_id = p.id
        WHERE b.pengguna_id = ?
        ORDER BY b.dibuat_pada DESC
    `).all(penggunaId);
}

function cekApakahSudahBookmark(penggunaId, tutorialId) {
    const row = db.prepare(`
        SELECT id FROM bookmark 
        WHERE pengguna_id = ? AND tutorial_id = ?
    `).get(penggunaId, tutorialId);
    return row !== undefined;
}

function tambahBookmark(penggunaId, tutorialId) {
    return db.prepare(`
        INSERT INTO bookmark (pengguna_id, tutorial_id) 
        VALUES (?, ?)
    `).run(penggunaId, tutorialId);
}

function hapusBookmark(id) {
    return db.prepare('DELETE FROM bookmark WHERE id = ?').run(id);
}

module.exports = {
    ambilBookmarkOlehPengguna,
    cekApakahSudahBookmark,
    tambahBookmark,
    hapusBookmark
};
