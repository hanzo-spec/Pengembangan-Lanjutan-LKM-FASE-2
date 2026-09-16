import { useState } from "react";

function Contact(){
    const [form, setForm] = useState({ nama: "", pesan: "" });
    const [status, setStatus] = useState(null);

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!form.nama.trim() || !form.pesan.trim()) {
            setStatus({ type: "error", text: "Nama dan pesan wajib diisi." });
            return;
        } 
        setStatus({
            type: "success",
            text: "Terima kasih, " + form.nama + "! Pesan kamu sudah terkirim.",
        });
        setForm({ nama: "", pesan: "" });
    }
    return (
        <section className="contact">
            <h2>Hubungi Saya</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Nama 
                    <input type="text" name="nama" value={form.nama} onChange={handleChange} />
                </label>
                <label>
                    Pesan
                    <textarea name="pesan" value={form.pesan} onChange={handleChange}></textarea>
                </label>
                <button type="submit">Kirim</button>
            </form>
            {status && <p className={status.type}>{status.text}</p>}
        </section>
    );
}

export default Contact;