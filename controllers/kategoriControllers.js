const KategoriModel = require("../models/Kategori");

// Fungsi untuk memvalidasi data kategori sebelum disimpan.
function validateKategori(nama_kategori, deskripsi) {
  const pesanError = [];

  if (!nama_kategori || nama_kategori.trim() === "") {
    pesanError.push("Nama kategori tidak boleh kosong");
  } else if (nama_kategori.trim().length < 3) {
    pesanError.push("Nama kategori harus terdiri dari minimal 3 karakter");
  } else if (nama_kategori.trim().length > 50) {
    pesanError.push("Nama kategori tidak boleh lebih dari 50 karakter");
  } else if (!/^[a-zA-Z0-9\s\&]+$/.test(nama_kategori.trim())) {
    pesanError.push("Nama kategori hanya boleh mengandung huruf, angka, spasi, dan simbol &");
  }

  if (!deskripsi || deskripsi.trim() === "") {
    pesanError.push("Deskripsi kategori tidak boleh kosong");
  } else if (deskripsi.trim().length < 10) {
    pesanError.push("Deskripsi kategori harus terdiri dari minimal 10 karakter");
  }

  return pesanError;
}

// Fungsi untuk menampilkan seluruh kategori yang tersedia.
function listKategori(req, res) {
  const kategoriList = KategoriModel.ambilSemuaKategori();

  const pesanSukses = req.session.pesanSukses;
  delete req.session.pesanSukses;

  res.render("pages/kategori/list", {
    kategoriList,
    pesanSukses,
    session: req.session
  });
}

// Fungsi untuk menampilkan form pembuatan kategori baru.
function showCreateForm(req, res) {
  res.render("pages/kategori/create", { session: req.session });
}

// Fungsi untuk menangani pembuatan kategori baru.
function createKategori(req, res) {
  const { nama_kategori, deskripsi } = req.body;

  const pesanError = validateKategori(nama_kategori, deskripsi);

  if (pesanError.length > 0) {
    res.render("pages/kategori/create", {
      pesanError,
      formData: { nama_kategori, deskripsi },
      session: req.session
    });
    return;
  }

  KategoriModel.buatKategori(nama_kategori, deskripsi);

  req.session.pesanSukses = "Kategori baru berhasil ditambahkan!";
  res.redirect("/kategori/list");
}

// Fungsi untuk menampilkan form edit kategori berdasarkan id.
function showEditForm(req, res) {
  const { id } = req.params;

  const kategori = KategoriModel.ambilKategoriById(id);

  res.render("pages/kategori/edit", {
    kategori,
    session: req.session
  });
}

// Fungsi untuk menangani pembaruan data kategori.
function editKategori(req, res) {
  const { id } = req.params;
  const { nama_kategori, deskripsi } = req.body;

  const pesanError = validateKategori(nama_kategori, deskripsi);

  if (pesanError.length > 0) {
    res.render("pages/kategori/edit", {
      pesanError,
      kategori: { id, nama_kategori, deskripsi },
      session: req.session
    });
    return;
  }

  KategoriModel.updateKategori(id, nama_kategori, deskripsi);

  req.session.pesanSukses = "Kategori berhasil diperbarui!";
  res.redirect("/kategori/list");
}

// Fungsi untuk menghapus kategori berdasarkan id.
function deleteKategori(req, res) {
  const { id } = req.params;

  KategoriModel.hapusKategori(id);

  req.session.pesanSukses = "Kategori berhasil dihapus!";
  res.redirect("/kategori/list");
}

module.exports = {
  listKategori,
  showCreateForm,
  createKategori,
  showEditForm,
  editKategori,
  deleteKategori,
};
