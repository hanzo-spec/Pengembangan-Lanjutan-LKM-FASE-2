import Hero from "../component/Hero";
import SkillCard from "../component/SkillCard";

const skills = [
    { id: 1, title: "HTML & CSS", desc: "Menyusun struktur dan tampilan halaman web." },
    { id: 2, title: "JavaScript", desc: "Menambahkan interaktivitas pada halaman web." },
    { id: 3, title: "React.js", desc: "Membangun antarmuka web berbasis komponen." },
];

function Home() {
    return (
        <div>
            <Hero
            title="Halo, Saya Farhan Nurrahman"
            subtitle="Siswa RPL yang belajar membangun aplikasi web dengan React."
            />
            <section className="skills-grid">
                {skills.map((skill) => (
                    <SkillCard key={skill.id} title={skill.title} desc={skill.desc} />
                ))}
            </section>
        </div>
    );
}

export default Home;