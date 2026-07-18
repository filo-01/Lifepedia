const TutorialModel = require("../models/Tutorial");
const KategoriModel = require("../models/Kategori");
const KomentarModel = require("../models/Komentar");

function validateTutorial(judul, kategori_id, deskripsi) {
    const pesanError = [];

    if (!judul || judul.trim() === "") {
        pesanError.push("Judul tutorial wajib diisi");
    } else if (judul.trim().length < 5) {
        pesanError.push("Judul tutorial minimal harus 5 karakter");
    }

    if (!kategori_id || kategori_id.trim() === "") {
        pesanError.push("Kategori bidang harus dipilih");
    }

    if (!deskripsi || deskripsi.trim() === "") {
        pesanError.push("Deskripsi singkat wajib diisi");
    }

    return pesanError;
}

function listTutorial(req, res) {
    const { search } = req.query;

    let tutorialList;

    if (search && search.trim() !== "") {
        tutorialList = TutorialModel.cariTutorial(search.trim());
    } else {
        tutorialList = TutorialModel.ambilSemuaTutorial();
    }

    const pesanSukses = req.session.pesanSukses;
    delete req.session.pesanSukses;

    return res.render("pages/tutorial/list", {
        tutorialList,
        pesanSukses,
        session: req.session
    });
}

function showDetailTutorial(req, res) {
    const { id } = req.params;

    TutorialModel.tambahJumlahDilihat(id);

    const tutorial = TutorialModel.ambilTutorialById(id);

    if (!tutorial) {
        return res.redirect("/");
    }

    const komentarList = KomentarModel.ambilKomentarByTutorial(id);

    return res.render("pages/tutorial/detail", {
        tutorial,
        komentarList,
        session: req.session
    });
}

function showCreateTutorialForm(req, res) {
    if (!req.session.email) {
        return res.redirect("/auth/login");
    }

    const kategoriList = KategoriModel.ambilSemuaKategori();

    return res.render("pages/tutorial/create", {
        kategoriList,
        session: req.session
    });
}

function createTutorial(req, res) {
    if (!req.session.email) {
        return res.redirect("/auth/login");
    }

    const penggunaId = req.session.penggunaId;
    const { judul, kategori_id, deskripsi } = req.body;

    const pesanError = validateTutorial(judul, kategori_id, deskripsi);

    if (!req.file) {
        pesanError.push("Anda wajib mengunggah gambar tutorial.");
    }

    if (pesanError.length > 0) {
        const kategoriList = KategoriModel.ambilSemuaKategori();

        return res.render("pages/tutorial/create", {
            pesanError,
            kategoriList,
            session: req.session
        });
    }

    TutorialModel.buatTutorial(
        penggunaId,
        kategori_id,
        judul,
        deskripsi,
        req.file.filename
    );

    req.session.pesanSukses = "Tutorial berhasil diterbitkan.";

    return res.redirect("/tutorial/list");
}

function showEditTutorialForm(req, res) {
    if (!req.session.email) {
        return res.redirect("/auth/login");
    }

    const { id } = req.params;

    const tutorial = TutorialModel.ambilTutorialById(id);

    if (!tutorial) {
        return res.redirect("/");
    }

    if (tutorial.pengguna_id !== req.session.penggunaId) {
        return res.render("pages/error", {
            pesanError: "Access Denied : Anda tidak memiliki hak untuk mengubah tutorial ini."
        });
    }

    const kategoriList = KategoriModel.ambilSemuaKategori();

    return res.render("pages/tutorial/edit", {
        tutorial,
        kategoriList,
        session: req.session
    });
}

function editTutorial(req, res) {
    if (!req.session.email) {
        return res.redirect("/auth/login");
    }

    const { id } = req.params;

    const tutorialLama = TutorialModel.ambilTutorialById(id);

    if (!tutorialLama) {
        return res.redirect("/");
    }

    if (tutorialLama.pengguna_id !== req.session.penggunaId) {
        return res.render("pages/error", {
            pesanError: "Access Denied : Anda tidak memiliki hak untuk mengubah tutorial ini."
        });
    }

    const {
        judul,
        kategori_id,
        deskripsi
    } = req.body;

    const pesanError = validateTutorial(
        judul,
        kategori_id,
        deskripsi
    );

    if (pesanError.length > 0) {
        const kategoriList = KategoriModel.ambilSemuaKategori();

        return res.render("pages/tutorial/edit", {
            pesanError,
            kategoriList,
            tutorial: {
                ...tutorialLama,
                judul,
                kategori_id,
                deskripsi
            },
            session: req.session
        });
    }

    let isi = tutorialLama.isi;

    if (req.file) {
        isi = req.file.filename;
    }

    TutorialModel.updateTutorial(
        id,
        kategori_id,
        judul,
        deskripsi,
        isi
    );

    req.session.pesanSukses = "Tutorial berhasil diperbarui.";

    return res.redirect("/pengguna/profil");
}

function deleteTutorial(req, res) {
    if (!req.session.email) {
        return res.redirect("/auth/login");
    }

    const { id } = req.params;

    const tutorial = TutorialModel.ambilTutorialById(id);

    if (!tutorial) {
        return res.redirect("/");
    }

    if (tutorial.pengguna_id !== req.session.penggunaId) {
        return res.render("pages/error", {
            pesanError: "Access Denied : Anda tidak memiliki hak untuk menghapus tutorial ini."
        });
    }

    TutorialModel.hapusTutorial(id);

    req.session.pesanSukses = "Tutorial berhasil dihapus.";

    return res.redirect("/pengguna/profil");
}

module.exports = {
    listTutorial,
    showDetailTutorial,
    showCreateTutorialForm,
    createTutorial,
    showEditTutorialForm,
    editTutorial,
    deleteTutorial
};