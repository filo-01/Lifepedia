const BookmarkModel = require("../models/Bookmark");

// Fungsi untuk menampilkan daftar tutorial yang telah disimpan pengguna sebagai bookmark.
function listBookmark(req, res) {
  if (!req.session.email) {
    res.redirect("/auth/login");
  }

  const penggunaId = req.session.penggunaId;
  const bookmarkList = BookmarkModel.ambilBookmarkOlehPengguna(penggunaId);

  const pesanSukses = req.session.pesanSukses;
  delete req.session.pesanSukses;

  res.render("pages/bookmark/list", {
    bookmarkList,
    pesanSukses,
    session: req.session
  });
}

// Fungsi untuk menambahkan tutorial ke daftar bookmark pengguna.
function addBookmark(req, res) {
  if (!req.session.email) {
    res.redirect("/auth/login");
  }

  const { tutorialId } = req.params;
  const penggunaId = req.session.penggunaId;

  const sudahDiBookmark = BookmarkModel.cekApakahSudahBookmark(penggunaId, tutorialId);

  if (!sudahDiBookmark) {
    BookmarkModel.tambahBookmark(penggunaId, tutorialId);
    req.session.pesanSukses = "Tutorial berhasil disimpan ke daftar bookmark!";
  }

  res.redirect("/bookmark/list");
}

// Fungsi untuk menghapus tutorial dari daftar bookmark pengguna.
function deleteBookmark(req, res) {
  if (!req.session.email) {
    res.redirect("/auth/login");
  }

  const { id } = req.params;

  BookmarkModel.hapusBookmark(id);

  req.session.pesanSukses = "Bookmark berhasil dihapus!";
  res.redirect("/bookmark/list");
}

module.exports = {
  listBookmark,
  addBookmark,
  deleteBookmark
};
