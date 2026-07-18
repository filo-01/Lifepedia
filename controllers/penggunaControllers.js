const PenggunaModel = require("../models/Pengguna");
const TutorialModel = require("../models/Tutorial");

function validateProfil(nama, username, bio) {
  const pesanError = [];

  if (!nama || nama.trim() === "") {
    pesanError.push("Nama lengkap tidak boleh kosong");
  } else if (nama.trim().length < 3) {
    pesanError.push("Nama lengkap minimal harus 3 karakter");
  }

  if (!username || username.trim() === "") {
    pesanError.push("Username tidak boleh kosong");
  } else if (!/^[a-zA-Z0-9\._]+$/.test(username.trim())) {
    pesanError.push("Username hanya boleh huruf, angka, titik, dan underscore");
  }

  if (!bio || bio.trim() === "") {
    pesanError.push("Bio tidak boleh kosong");
  } else if (bio.trim().length > 150) {
    pesanError.push("Bio terlalu panjang, maksimal 150 karakter");
  }

  return pesanError;
}

function showProfil(req, res) {
  if (!req.session.email) {
    res.redirect("/auth/login");
    return;
  }

  const id = req.session.penggunaId;
  const pengguna = PenggunaModel.ambilPenggunaById(id);
  const tutorialSaya = TutorialModel.ambilTutorialOlehPengguna(id);

  res.render("pages/pengguna/profile", {
    pengguna,
    tutorialSaya,
    session: req.session
  });
}

function showEditProfilForm(req, res) {
  if (!req.session.email) {
    res.redirect("/auth/login");
    return;
  }

  const id = req.session.penggunaId;
  const pengguna = PenggunaModel.ambilPenggunaById(id);

  res.render("pages/pengguna/edit", { pengguna, session: req.session });
}

function editProfil(req, res) {
  if (!req.session.email) {
    res.redirect("/auth/login");
    return;
  }

  const id = req.session.penggunaId;
  const { nama, username, bio } = req.body;

  const pesanError = validateProfil(nama, username, bio);

  if (pesanError.length > 0) {
    const penggunaLama = PenggunaModel.ambilPenggunaById(id);
    res.render("pages/pengguna/edit", {
      pesanError,
      pengguna: { ...penggunaLama, nama, username, bio },
      session: req.session
    });
    return;
  }

  let namaFotoProfil = null;
  if (req.file) {
    namaFotoProfil = req.file.filename;
  } else {
    const penggunaLama = PenggunaModel.ambilPenggunaById(id);
    namaFotoProfil = penggunaLama.foto_profil;
  }

  PenggunaModel.updateProfil(id, nama, username, bio, namaFotoProfil);

  req.session.username = username;

  res.redirect("/pengguna/profil");
}

module.exports = {
  showProfil,
  showEditProfilForm,
  editProfil
};
