import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext"; 

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate(); 
    const { login } = useAuth(); 
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    function handleSubmit(e) {
        e.preventDefault();
        setError(""); 

        if (!form.email.includes("@")) {
            setError("Email tidak valid");
            return;
        }

        if (form.password.length < 6) {
            setError("Password minimal 6 karakter");
            return;
        }

        if (login) {
            login(form); 
        }

        navigate("/keranjang"); 
    }

    return (
        <div style={{ maxWidth: "400px", margin: "40px auto", padding: "20px", textAlign: "center" }}>
            <h2>Login</h2>
            
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

                {error && <p style={{ color: "red", margin: "0", fontSize: "14px" }}>{error}</p>}
                
                <button type="submit" style={{ padding: "10px", backgroundColor: "#1e293b", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
                    Login
                </button>
            </form>

            <p style={{ marginTop: "15px", fontSize: "14px" }}>
                Belum punya akun? <Link to="/register" style={{ color: "#007bff", textDecoration: "underline" }}>Daftar di sini</Link>
            </p>
        </div>
    );
}