import SocialMedia from "../component/SocialMedia";

function About() {
    return (
        <section className="About">
            <h2>Tentang Saya</h2>
            
            <p>Nama:  Farhan Nurrahman</p>
            <p>Sekolah: SMK PUSDIKHUBAD CIMAHI</p>
            <p>Kompetensi Keahlian: Rekayasa Perangkat Lunak</p>
            <p>
                Saya tertarik pada pengembangan web front-end dan sedang belajar
                React.js untuk membangun aplikasi  yang interaktif.
            </p>
            <SocialMedia />
        </section>
    );
}

export default About;