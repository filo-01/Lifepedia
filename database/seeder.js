const db = require('./config');
const bcrypt = require('bcrypt');

db.pragma("foreign_keys = ON");

async function hashPassword(password) {
    return await bcrypt.hash(password, 10);
}

async function seedDatabase() {
    try {
        console.log('🌱 Memulai seeding database...');

        console.log('\n🧹 Menghapus data lama...');
        db.prepare('DELETE FROM bookmark').run();
        db.prepare('DELETE FROM tutorial').run();
        db.prepare('DELETE FROM kategori').run();
        db.prepare('DELETE FROM pengguna').run();

        console.log('📝 Seeding tabel pengguna...');
        const userPassword = await hashPassword('user123');

        const userDataList = [];
        const userList = [
            { nama: 'firobun07', username: 'Filo_ProPlayerNguli', bio: '1 orang mendapat pekerjaan, orang lain menanti 19jt lapangan pekerjaan', foto_profil: 'filo.jpg' },
            { nama: 'dazai.osamu97', username: 'dzai.samu03', bio: 'mengagumimu dari jauh adalah caraku mencintaimu.. aseli lyf too short buat dilewatin tanpa kamu, emang boleh se-sadboy ini?', foto_profil: 'dazai.jpg' },
            { nama: 'f.dostoevsky99', username: 'fdr.dstv', bio: 'Skill issue. Всё идёт по плану.', foto_profil: 'fyodor.jpg' },
            { nama: 'nikolai.gogol00', username: 'gogol_dailyQuiz', bio: 'Kejutan hari ini: Коротше, aku juga nggak tahu mau ngapain.', foto_profil: 'nikolai.jpg' },
            { nama: 'ranpo_edg', username: 'ur_numb1Detective', bio: 'Google? apa itu Google? Ranpo 1st !! no.1 detective se-kecamatan. jgn nanya arah jln ke w.', foto_profil: 'ranpo.jpg' },
            { nama: 'nakahara.chuya98', username: 'chuya_nkhra', bio: '178 cm di hati orang yang benar. 乾杯.', foto_profil: 'chuuya.jpg' },
            { nama: 'shin_asakura02', username: 'shin.akura_', bio: 'kasir sakamoto grocery store!! 📢 mampir ya gess, lokasi toko sbelah angkringan pak slamet.', foto_profil: 'shin.jpg' },
            { nama: 'nagu.yochi95', username: 'nagumooo__', bio: 'gatau bsk jdi siapa lgi haha. btw sbtu malam kosong gakk? jln yuk? jgn baper ya gua emg ramah ke smua org', foto_profil: 'nagumo.jpg' },
            { nama: 'satoruhitz', username: 'cool_Toru', bio: ' THE HONORED ONE. kating hukum 24. nah, i.d win. syng bgt gua diciptakan ganteng mksimal. endorse? dm', foto_profil: 'satoru.jpg' },
            { nama: 'winti_bardz', username: 'venti.thebard', bio: 'senja & gitaran angkringan. hri ini ngewine, besok mikir lgi. info dana kaget dong kak butuh senar baru', foto_profil: 'venti.jpg' }
        ];

        for (const user of userList) {
            const email = `${user.nama}@lfpedia.com`;
            const result = db.prepare(`
                INSERT INTO pengguna (nama, username, email, password, bio, foto_profil)
                VALUES (?, ?, ?, ?, ?, ?)
            `).run(
                user.nama,
                user.username,
                email,
                userPassword,
                user.bio,
                user.foto_profil
            );

            userDataList.push({ id: result.lastInsertRowid, ...user });
        }

        console.log('📝 Seeding tabel kategori...');
        const kategoriList = [
            { nama: 'Teknologi & Cyber', deskripsi: 'Seputar keamanan data cyber ala sesepuh bawah tanah.' },
            { nama: 'Kuliner & Baking', deskripsi: 'Kumpulan resep rahasia masakan lokal anti gagal.' },
            { nama: 'Kesehatan & Kebugaran', deskripsi: 'Tips tips peregangan fisik yang sangat alternatif.' },
            { nama: 'Sosial & Hubungan', deskripsi: 'Cara menghadapi asmara anak muda zaman sekarang.' },
            { nama: 'Investigasi & Logika', deskripsi: 'Metode analisis kebohongan kilat tanpa bantuan Google.' },
            { nama: 'Gaya Hidup & Hiburan', deskripsi: 'Tutorial bersosial media estetik dan pamer karisma.' }
        ];

        const kategoriDataList = [];

        for (const kat of kategoriList) {
            const result = db.prepare(`
                INSERT INTO kategori (nama_kategori, deskripsi) 
                VALUES (?, ?)
            `).run(kat.nama, kat.deskripsi);

            kategoriDataList.push({ id: result.lastInsertRowid, ...kat });
        }

        console.log('📝 Seeding tabel tutorial...');
        const tutorialList = [
            {
                username: 'fdr.dstv',
                kategori: 'Teknologi & Cyber',
                judul: 'Panduan Mengamankan Enkripsi Data Pribadi dari Kebocoran Sistem',
                deskripsi: 'Metode dasar mengunci paket data menggunakan algoritma end-to-end.',
                isi: 'langkah_cyber_secure.jpg'
            },
            {
                username: 'dzai.samu03',
                kategori: 'Kesehatan & Kebugaran',
                judul: 'Tips Melatih Fleksibilitas Otot Leher Menggunakan Tali Jemuran',
                deskripsi: 'Peregangan leher statis alternatif untuk menghilangkan penat duniawi.',
                isi: 'langkah_leher_statis.jpg'
            },
            {
                username: 'shin.akura_',
                kategori: 'Kuliner & Baking',
                judul: 'Cara Membuat Kue Bolu Santan Lembut Antigagal Tanpa Mixer',
                deskripsi: 'Tips baking kilat takaran sendok langsung dari kasir Toko Sakamoto.',
                isi: 'langkah_bolu_sakamoto.jpg'
            },
            {
                username: 'ur_numb1Detective',
                kategori: 'Investigasi & Logika',
                judul: 'Cara Cepat Menganalisis Kebohongan Seseorang Tanpa Alat Bantu Mesin',
                deskripsi: 'Membaca gerak-gerik lawan bicara dalam waktu 3 detik awal.',
                isi: 'langkah_forensik_logika.jpg'
            },
            {
                username: 'cool_Toru',
                kategori: 'Gaya Hidup & Hiburan',
                judul: 'Tutorial Mempertahankan Visual Karismatik Maksimal di Segala Situasi Kuliah',
                deskripsi: 'Panduan percaya diri mutlak untuk menjadi seleb kampus idaman.',
                isi: 'langkah_gojo_hitz.jpg'
            }
        ];

        for (const tutor of tutorialList) {
            const targetUser = userDataList.find(u => u.username === tutor.username);
            const targetKat = kategoriDataList.find(k => k.nama === tutor.kategori);

            if (targetUser && targetKat) {
                db.prepare(`
                    INSERT INTO tutorial (pengguna_id, kategori_id, judul, deskripsi, isi)
                    VALUES (?, ?, ?, ?, ?)
                `).run(
                    targetUser.id,
                    targetKat.id,
                    tutor.judul,
                    tutor.deskripsi,
                    tutor.isi
                );
            }
        }

        console.log('✅ Seeding database selesai dengan sukses!');

    } catch (error) {
        console.error('❌ Terjadi error saat seeding:', error);
    }
}

seedDatabase();
