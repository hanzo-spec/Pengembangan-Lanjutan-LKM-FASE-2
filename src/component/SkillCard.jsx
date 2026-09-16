function SkillCard({ title, desc }) {
    return (
        <div className="skill-card">
            <h3>{title}</h3>
            <p>{desc}</p>
        </div>
    );
}

export default SkillCard;