const db = require('../database/config');

function ambilSemuaTutorial() {
    return db.prepare(`
        SELECT
            t.*,
            k.nama_kategori,
            p.username,
            p.foto_profil
        FROM tutorial t
        JOIN kategori k
            ON t.kategori_id = k.id
        JOIN pengguna p
            ON t.pengguna_id = p.id
        ORDER BY t.id DESC
    `).all();
}

function ambilTutorialById(id) {
    return db.prepare(`
        SELECT
            t.*,
            k.nama_kategori,
            p.username,
            p.foto_profil
        FROM tutorial t
        JOIN kategori k
            ON t.kategori_id = k.id
        JOIN pengguna p
            ON t.pengguna_id = p.id
        WHERE t.id = ?
    `).get(id);
}

function ambilTutorialOlehPengguna(penggunaId) {
    return db.prepare(`
        SELECT
            t.*,
            k.nama_kategori
        FROM tutorial t
        JOIN kategori k
            ON t.kategori_id = k.id
        WHERE t.pengguna_id = ?
        ORDER BY t.id DESC
    `).all(penggunaId);
}

function cariTutorial(kataKunci) {
    return db.prepare(`
        SELECT
            t.*,
            k.nama_kategori,
            p.username,
            p.foto_profil
        FROM tutorial t
        JOIN kategori k
            ON t.kategori_id = k.id
        JOIN pengguna p
            ON t.pengguna_id = p.id
        WHERE
            t.judul LIKE ?
            OR t.deskripsi LIKE ?
        ORDER BY t.id DESC
    `).all(
        `%${kataKunci}%`,
        `%${kataKunci}%`
    );
}

function buatTutorial(penggunaId, kategoriId, judul, deskripsi, isi) {
    return db.prepare(`
        INSERT INTO tutorial (
            pengguna_id,
            kategori_id,
            judul,
            deskripsi,
            isi
        )
        VALUES (?, ?, ?, ?, ?)
    `).run(
        penggunaId,
        kategoriId,
        judul,
        deskripsi,
        isi
    );
}

function updateTutorial(id, judul, deskripsi, isi) {
    return db.prepare(`
        UPDATE tutorial
        SET
            judul = ?,
            deskripsi = ?,
            isi = ?,
            diperbarui_pada = CURRENT_TIMESTAMP
        WHERE id = ?
    `).run(
        judul,
        deskripsi,
        isi,
        id
    );
}

function hapusTutorial(id) {
    return db.prepare(`
        DELETE FROM tutorial
        WHERE id = ?
    `).run(id);
}

function tambahJumlahDilihat(id) {
    return db.prepare(`
        UPDATE tutorial
        SET jumlah_dilihat = jumlah_dilihat + 1
        WHERE id = ?
    `).run(id);
}

function ambilTutorialPopuler() {
    return db.prepare(`
        SELECT
            t.*,
            k.nama_kategori,
            p.username,
            p.foto_profil
        FROM tutorial t
        JOIN kategori k
            ON t.kategori_id = k.id
        JOIN pengguna p
            ON t.pengguna_id = p.id
        ORDER BY
            t.jumlah_dilihat DESC,
            t.id DESC
        LIMIT 5
    `).all();
}

function ambilTutorialTerbaru() {
    return db.prepare(`
        SELECT
            t.*,
            k.nama_kategori,
            p.username,
            p.foto_profil
        FROM tutorial t
        JOIN kategori k
            ON t.kategori_id = k.id
        JOIN pengguna p
            ON t.pengguna_id = p.id
        ORDER BY
            t.dibuat_pada DESC
        LIMIT 5
    `).all();
}

module.exports = {
    ambilSemuaTutorial,
    ambilTutorialById,
    ambilTutorialOlehPengguna,
    cariTutorial,
    buatTutorial,
    updateTutorial,
    hapusTutorial,
    tambahJumlahDilihat,
    ambilTutorialPopuler,
    ambilTutorialTerbaru
};