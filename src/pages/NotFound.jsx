import { Link } from "react-router-dom";

function NotFound() {
    return (
        <section className="not-found">
            <h2>404 - Halaman Tidak Ditemukan</h2>
            <p>Alamat yang kamu tuju tidak tersedia atau sudah dipindahkan.</p>
            <Link to="/">Kembali ke Beranda</Link>
        </section>
    );
}

export default NotFound; 