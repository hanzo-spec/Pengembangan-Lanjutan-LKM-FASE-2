import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = location.state?.from?.pathname || "/dashboard";

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const succes = login(form.email, form.password);
        if (succes) {
            navigate(redirectTo, { replace: true });
        } else {
            setError("Email dan password wajib diisi.")
        }
    }

    return (
        <section className="login">
            <h2>Masuk ke Akun</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Email
                    <input type="email" name="email" value={form.email} onChange={handleChange} />
                </label>
                <label>
                    Password 
                    <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    />
                </label>
                <button type="submit">Masuk</button>
            </form>
            {error && <p className="error">{error}</p>}
        </section>
    );
}

export default Login;