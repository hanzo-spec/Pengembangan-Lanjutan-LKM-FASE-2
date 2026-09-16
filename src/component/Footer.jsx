function Footer(){
    const year = new Date().getFullYear();
    return (
        <footer className="footer">
            <p>&copy; {year} Potofolio Saya. Seluruh hak cipta dilindungi.</p>
        </footer>
    );
}

export default Footer;