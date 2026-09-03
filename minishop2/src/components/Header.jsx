import { Link } from "react-router-dom";
import { useKeranjang } from "../context/KeranjangContext.jsx";

function Header() {
  const { item } = useKeranjang();

  return (
    <header style={{ marginBottom: "20px" }}>
      <div style={{ backgroundColor: "#334155", padding: "15px", textAlign: "center" }}>
        <h1 style={{ color: "white", fontSize: "28px", margin: 0, fontWeight: "Time New Roman" }}>TROVE STUDIO </h1>
      </div>
      <nav style={{ 
        backgroundColor: "#475569", 
        padding: "12px", 
        display: "flex", 
        justifyContent: "center", 
        gap: "30px" 
      }}>
        <Link to="/" style={{ color: "white", textDecoration: "none", fontWeight: "500" }}>
          Beranda
        </Link>
        <Link to="/keranjang" style={{ color: "white", textDecoration: "none", fontWeight: "Times New Roman" }}>
          Keranjang ({item ? item.length : 0})
        </Link>
      </nav>
    </header>
  );
}

export default Header;