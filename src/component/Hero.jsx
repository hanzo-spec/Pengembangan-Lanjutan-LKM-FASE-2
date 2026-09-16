function Hero({ title, subtitle }) {
    return (
        <section className="hero">
            <h1>{title}</h1>
            <p>{subtitle}</p><br></br>
            <img src={`${import.meta.env.BASE_URL}image/obito.jpg`} alt="Foto Profil" className="profile-photo" />
        </section>
    );
}

export default Hero;