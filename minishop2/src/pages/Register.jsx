import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSuccess("");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            setError("Format email tidak valid");
            return;
        }

        if (form.password.length < 6) {
            setError("Password minimal 6 karakter");
            return;
        }

        if (form.password !== form.confirmPassword) {
            setError("Konfirmasi password tidak cocok");
            return;
        }

        setSuccess("Registrasi berhasil!");
        console.log("Data pendaftaran:", form);
    }

    return (
        <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", textAlign: "center" }}>
            <h2>Register</h2>
            
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px", textAlign: "left" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label style={{ fontWeight: "bold" }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Masukkan Email"
                        value={form.email}
                        onChange={handleChange}
                        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label style={{ fontWeight: "bold" }}>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Masukkan Password"
                        value={form.password}
                        onChange={handleChange}
                        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                    <label style={{ fontWeight: "bold" }}>Konfirmasi Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Ulangi Password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
                    />
                </div>

                {error && <p style={{ color: "red", margin: "0", fontSize: "14px" }}>{error}</p>}
                {success && <p style={{ color: "green", margin: "0", fontSize: "14px" }}>{success}</p>}

                <button type="submit" style={{ padding: "10px", backgroundColor: "#1e293b", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                    Register
                </button>
            </form>

            <p style={{ marginTop: "15px", fontSize: "14px" }}>
                Sudah punya akun? <Link to="/login" style={{ color: "#007bff", textDecoration: "underline" }}>Login di sini</Link>
            </p>
        </div>
    );
}