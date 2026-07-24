// Menghubungkan aplikasi ke database SQLite lokal bernama Lifepedia.db.
const Database = require('better-sqlite3');
const db = new Database('Lifepedia.db');

module.exports = db;