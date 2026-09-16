import ProjectCard from "../component/ProjectCard";

const projects = [
    {
        id: 1,
        title: "Aplikasi Pencatat Uang Harian",
        desc: "Aplikasi yang menghitung pemasukan dan pengeluaran kita.",
        image: "/image/ssuang.png",
        tech: ["HTML", "JAVASCRIPT", "CSS"],
        githubUrl: "https://github.com/hanzo-spec/Expense-Tracker",
        demoUrl: "https://uanghan.netlify.app",
    },
    {
         id: 2,
        title: "Aplikasi Catatan Sederhana",
        desc: "Aplikasi pencatat tugas harian.",
        image: "/image/sslist.png",
        tech: ["HTML", "JAVASCRIPT", "CSS"],
        githubUrl: "https://github.com/hanzo-spec/Proyek-To-Do-List",
        demoUrl: "https://tdlhan.netlify.app/",
    },
    {
         id: 3,
        title: "Aplikasi Kasir Toko Sederhana",
        desc: "Aplikasi untuk mengelelola proses transaksi jual beli.",
        image: "/image/sstoko.png",
        tech: ["HTML", "JAVASCRIPT", "CSS"],
        githubUrl: "https://github.com/hanzo-spec/Kasir-Toko-Sederhana",
        demoUrl: "https://kasirhan.netlify.app/",
    },
];

function Projects() {
    return (
        <section className="projects">
            <h2>Proyek Saya</h2>
            <div className="project-grid">
                {projects.map((p) => (
                    <ProjectCard key={p.id} {...p} />
                ))}
            </div>
        </section>
    );
}

export default Projects;