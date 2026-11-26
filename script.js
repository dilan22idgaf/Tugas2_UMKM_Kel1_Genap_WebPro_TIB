const rupiah = n => 'Rp' + n.toLocaleString('id-ID');
const HARI = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

// Waktu sekarang menurut WIB, apa pun zona waktu perangkat pengunjung
function sekarangWIB() {
    return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta' }));
}
const dua = n => String(n).padStart(2, '0');

function tampilkanWaktu() {
    const el = document.getElementById('waktu');
    if (!el) return;
    const t = sekarangWIB();
    el.textContent = HARI[t.getDay()] + ', ' + t.getDate() + ' ' + BULAN[t.getMonth()] + ' ' + t.getFullYear() +
        ' | ' + dua(t.getHours()) + ':' + dua(t.getMinutes()) + ':' + dua(t.getSeconds()) + ' WIB';
}

function tampilkanSalam() {
    const el = document.getElementById('salam');
    if (!el) return;
    const jam = sekarangWIB().getHours();
    let salam = 'Selamat malam';
    if (jam >= 4 && jam < 11) salam = 'Selamat pagi';
    else if (jam >= 11 && jam < 15) salam = 'Selamat siang';
    else if (jam >= 15 && jam < 18) salam = 'Selamat sore';
    el.textContent = salam + ', selamat menikmati informasi Sweet Box!';
}

// Jam pelayanan: Senin - Sabtu, 10.00 - 20.00 WIB
function tampilkanStatusBuka() {
    const el = document.getElementById('status-buka');
    if (!el) return;
    const t = sekarangWIB();
    const hariKerja = t.getDay() >= 1 && t.getDay() <= 6;
    const buka = hariKerja && t.getHours() >= 10 && t.getHours() < 20;
    el.textContent = buka ? 'Status saat ini: Sedang buka' : 'Status saat ini: Sedang tutup';
    el.className = 'status ' + (buka ? 'buka' : 'tutup');
}

// Ringkasan harga dihitung dari data-harga pada setiap label harga produk
function tampilkanRingkasanHarga() {
    const el = document.getElementById('ringkasan');
    if (!el) return;
    const harga = Array.from(document.querySelectorAll('.price')).map(p => Number(p.dataset.harga));
    el.textContent = harga.length + ' varian tersedia, harga mulai ' + rupiah(Math.min(...harga)) +
        ' sampai ' + rupiah(Math.max(...harga)) + ' per box';
}

tampilkanSalam();
tampilkanStatusBuka();
tampilkanRingkasanHarga();
tampilkanWaktu();
setInterval(tampilkanWaktu, 1000);
