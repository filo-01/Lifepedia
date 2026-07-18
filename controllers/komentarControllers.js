const KomentarModel = require("../models/Komentar");

function validateKomentar(isi) {
  const pesanError = [];

  if (!isi || isi.trim() === "") {
    pesanError.push("Komentar tidak boleh kosong");
  } else if (isi.trim().length < 3) {
    pesanError.push("Komentar harus terdiri dari minimal 3 karakter");
  } else if (isi.trim().length > 500) {
    pesanError.push("Komentar tidak boleh lebih dari 500 karakter");
  }

  return pesanError;
}

function createKomentar(req, res) {
  if (!req.session.email) {
    return res.redirect("/auth/login");
  }

  const penggunaId = req.session.penggunaId;
  const { tutorial_id } = req.params;
  const { isi } = req.body;

  const pesanError = validateKomentar(isi);

  if (pesanError.length > 0) {
    req.session.pesanError = pesanError;
    return res.redirect("/tutorial/detail/" + tutorial_id);
  }

  KomentarModel.buatKomentar(
    penggunaId,
    tutorial_id,
    isi
  );

  req.session.pesanSukses = "Komentar berhasil ditambahkan!";

  return res.redirect("/tutorial/detail/" + tutorial_id);
}


function deleteKomentar(req, res) {
  if (!req.session.email) {
    res.redirect("/auth/login");
    return;
  }

  const { id, tutorial_id } = req.params;

  KomentarModel.hapusKomentar(id);

  req.session.pesanSukses = "Komentar berhasil dihapus!";

  res.redirect("/tutorial/detail/" + tutorial_id);
}

module.exports = {
  createKomentar,
  deleteKomentar
};