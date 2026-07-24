const db = require('./config');

db.pragma("foreign_keys = ON");

/*
  Membuat tabel pengguna untuk menyimpan data akun.
  id = identitas unik tiap user.
  email wajib unik agar tidak ada akun duplikat.
  CURRENT_TIMESTAMP dipakai untuk mengisi waktu otomatis saat data dibuat.
*/
db.exec(`
  CREATE TABLE IF NOT EXISTS pengguna (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama TEXT NOT NULL,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    foto_profil TEXT,
    bio TEXT,
    dibuat_pada DATETIME DEFAULT CURRENT_TIMESTAMP,
    diperbarui_pada DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

/*
  Membuat tabel kategori untuk mengelompokkan tutorial.
  nama_kategori wajib unik agar tidak ada kategori yang sama.
*/
db.exec(`
  CREATE TABLE IF NOT EXISTS kategori (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nama_kategori TEXT NOT NULL UNIQUE,
    deskripsi TEXT
  );
`);

/*
  Membuat tabel tutorial untuk menyimpan isi konten.
  tutorial terhubung ke tabel pengguna dan kategori melalui foreign key.
*/
db.exec(`
  CREATE TABLE IF NOT EXISTS tutorial (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pengguna_id INTEGER NOT NULL,
    kategori_id INTEGER NOT NULL,
    judul TEXT NOT NULL,
    deskripsi TEXT,
    isi TEXT NOT NULL,
    jumlah_dilihat INTEGER DEFAULT 0,
    dibuat_pada DATETIME DEFAULT CURRENT_TIMESTAMP,
    diperbarui_pada DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (kategori_id) REFERENCES kategori(id) ON DELETE CASCADE
  );
`);

/*
  Membuat tabel bookmark untuk menyimpan tutorial yang disimpan user.
  UNIQUE memastikan user tidak bisa menyimpan tutorial yang sama dua kali.
*/
db.exec(`
  CREATE TABLE IF NOT EXISTS bookmark (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pengguna_id INTEGER NOT NULL,
    tutorial_id INTEGER NOT NULL,
    dibuat_pada DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (tutorial_id) REFERENCES tutorial(id) ON DELETE CASCADE,
    UNIQUE (pengguna_id, tutorial_id)
  );
`);

/*
  Membuat tabel komentar untuk menyimpan pendapat user pada tutorial.
*/
db.exec(`
  CREATE TABLE IF NOT EXISTS komentar (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    pengguna_id INTEGER NOT NULL,
    tutorial_id INTEGER NOT NULL,
    isi TEXT NOT NULL,
    dibuat_pada DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pengguna_id) REFERENCES pengguna(id) ON DELETE CASCADE,
    FOREIGN KEY (tutorial_id) REFERENCES tutorial(id) ON DELETE CASCADE
  );
`);

/*
  Membuat index agar pencarian data berdasarkan relasi lebih cepat.
*/
db.exec(`
  CREATE INDEX IF NOT EXISTS idx_tutorial_pengguna ON tutorial(pengguna_id);
  CREATE INDEX IF NOT EXISTS idx_tutorial_kategori ON tutorial(kategori_id);
  CREATE INDEX IF NOT EXISTS idx_bookmark_pengguna ON bookmark(pengguna_id);
  CREATE INDEX IF NOT EXISTS idx_bookmark_tutorial ON bookmark(tutorial_id);
  CREATE INDEX IF NOT EXISTS idx_komentar_pengguna ON komentar(pengguna_id);
  CREATE INDEX IF NOT EXISTS idx_komentar_tutorial ON komentar(tutorial_id);
`);