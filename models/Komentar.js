const db = require("../database/config");

function ambilKomentarByTutorial(tutorialId) {
    return db.prepare(`
        SELECT
            k.id,
            k.isi,
            k.dibuat_pada,
            p.id AS pengguna_id,
            p.nama,
            p.username,
            p.foto_profil
        FROM komentar k
        JOIN pengguna p
            ON k.pengguna_id = p.id
        WHERE k.tutorial_id = ?
        ORDER BY k.dibuat_pada DESC
    `).all(tutorialId);
}

function buatKomentar(penggunaId, tutorialId, isi) {
    return db.prepare(`
        INSERT INTO komentar (
            pengguna_id,
            tutorial_id,
            isi
        )
        VALUES (?, ?, ?)
    `).run(
        penggunaId,
        tutorialId,
        isi
    );
}

function hapusKomentar(id) {
    return db.prepare(`
        DELETE FROM komentar
        WHERE id = ?
    `).run(id);
}

module.exports = {
    ambilKomentarByTutorial,
    buatKomentar,
    hapusKomentar
};