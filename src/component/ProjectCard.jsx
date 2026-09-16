function ProjectCard({ title, desc, image, tech, githubUrl, demoUrl }) {
    return (
        <div className="project-card">
            <img src={image} alt={ title} className="project-preview" />
            <div className="project-body">
            <h3>{title}</h3>
            <p>{desc}</p>
            <div className="project-tech">
                {tech.map((t) => (
                    <span key={t} className="tech-badge">
                        {t}
                        </span>
                ))}
            </div>
            <div className="project-links">
                <a href={githubUrl} target="_blank" rel="noreferrer">
                    Kode di Github
                </a>
                {demoUrl && (
                    <a href={demoUrl} target="_blank" rel="noreferrer">
                        Lihat Aplikasi
                    </a>
                )}
            </div>
        </div>
        </div>
    );
}

export default ProjectCard;