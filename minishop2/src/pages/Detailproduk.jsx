import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// Samakan kurs dengan halaman utama (1 USD = Rp 15.000)
const KURS_USD_TO_IDR = 15000;

function Detailproduk() {
  const { id } = useParams();
  const [produk, setProduk] = useState(null);
  const [deskripsiIndo, setDeskripsiIndo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data");
        return res.json();
      })
      .then(async (data) => {
        if (!data || Object.keys(data).length === 0) {
          setProduk(null);
        } else {
          setProduk(data);

          // Terjemahkan deskripsi dengan membatasi panjang teks agar tidak melebihi limit API (500 karakter)
          if (data.description) {
            const textToTranslate = data.description.substring(0, 450);
            try {
              const resTranslate = await fetch(
                `https://api.mymemory.translated.net/get?q=${encodeURIComponent(
                  textToTranslate
                )}&langpair=en|id`
              );
              const dataTranslate = await resTranslate.json();
              if (
                dataTranslate.responseData?.translatedText &&
                !dataTranslate.responseData.translatedText.includes("LIMIT EXCEEDED")
              ) {
                setDeskripsiIndo(dataTranslate.responseData.translatedText);
              } else {
                setDeskripsiIndo(data.description);
              }
            } catch (errTranslate) {
              console.error("Gagal menerjemahkan deskripsi:", errTranslate);
              setDeskripsiIndo(data.description);
            }
          }
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="detail-container" style={{ padding: "40px", textAlign: "center" }}>
        <p>Memuat detail produk...</p>
      </div>
    );
  }

  if (error || !produk) {
    return (
      <div className="produk-tidak-ada" style={{ padding: "40px", textAlign: "center" }}>
        <p>Produk tidak ditemukan</p>
        <Link to="/">Kembali ke Beranda</Link>
      </div>
    );
  }

  // Menghitung harga sama persis dengan halaman utama
  const hargaRupiah = produk.price ? Math.round(produk.price * KURS_USD_TO_IDR) : 0;
  const hargaFormat = hargaRupiah.toLocaleString("id-ID");

  const stokTersedia = produk.rating?.count ?? 0;

  return (
    <div className="detail-container" style={{ maxWidth: "900px", margin: "0 auto", padding: "20px" }}>
      <div className="breadcrumb" style={{ marginBottom: "20px" }}>
        <Link to="/">Beranda</Link> / <span>{produk.title}</span>
      </div>

      <div
        className="detail-card"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div
          className="detail-gambar-wrap"
          style={{
            width: "100%",
            maxWidth: "280px",
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            src={produk.image}
            alt={produk.title}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="detail-info" style={{ textAlign: "center", width: "100%" }}>
          <h1
            className="detail-nama"
            style={{
              fontSize: "1.5rem",
              lineHeight: "1.4",
              margin: "10px 0",
              wordBreak: "break-word",
            }}
          >
            {produk.title}
          </h1>

          <div className="detail-harga-box" style={{ margin: "10px 0" }}>
            <p className="detail-harga" style={{ fontSize: "1.25rem", fontWeight: "bold", color: "#2e7d32" }}>
              Rp {hargaFormat}
            </p>
          </div>

          <div className="detail-deskripsi" style={{ marginTop: "15px", textAlign: "left" }}>
            <h2 style={{ fontSize: "1.1rem", marginBottom: "8px" }}>Deskripsi</h2>
            <p style={{ color: "#555", lineHeight: "1.6" }}>
              {deskripsiIndo || produk.description}
            </p>
          </div>

          <p className="stok-info" style={{ marginTop: "15px", color: "#666" }}>
            {stokTersedia > 0
              ? `Stok tersedia: ${stokTersedia}`
              : "Stok habis"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Detailproduk;