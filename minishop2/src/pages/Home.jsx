import ProdukCard from "../components/ProdukCard";
import { useState, useEffect } from "react";

function Home() {
  const [produk, setProduk] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [kataKunci, setKataKunci] = useState("");
  const [kategoriList, setKategoriList] = useState([]);
  const [kategoriTerpilih, setKategoriTerpilih] = useState("");

  const [halaman, setHalaman] = useState(1);
  const itemPerHalaman = 4;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [resProduk, resKategori] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ]);

        if (!resProduk.ok || !resKategori.ok) {
          throw new Error("Gagal mengambil data dari server");
        }

        const dataProduk = await resProduk.json();
        const dataKategori = await resKategori.json();

        setProduk(dataProduk);
        setKategoriList(dataKategori);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const produkTersaring = produk.filter((p) => {
    const namaProduk = p.title || p.nama || "";
    const kategoriProduk = p.category || p.kategori || "";

    const cocokNama = namaProduk
      .toLowerCase()
      .includes(kataKunci.toLowerCase());
    const cocokKategori =
      kategoriTerpilih === "" || kategoriProduk === kategoriTerpilih;

    return cocokNama && cocokKategori;
  });

  const totalHalaman = Math.ceil(produkTersaring.length / itemPerHalaman);
  const indeksAwal = (halaman - 1) * itemPerHalaman;
  const produkDitampilkan = produkTersaring.slice(
    indeksAwal,
    indeksAwal + itemPerHalaman
  );

  const handlePencarianChange = (e) => {
    setKataKunci(e.target.value);
    setHalaman(1);
  };

  const handleKategoriChange = (e) => {
    setKategoriTerpilih(e.target.value);
    setHalaman(1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-100px">
        <p className="text-gray-500 font-medium text-lg animate-pulse">
          Memuat produk dari API...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-100px">
        <p className="text-red-500 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Cari Produk..."
          value={kataKunci}
          onChange={handlePencarianChange}
          className="border border-gray-300 p-2.5 rounded-md w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={kategoriTerpilih}
          onChange={handleKategoriChange}
          className="border border-gray-300 p-2.5 rounded-md w-full sm:w-1/2 capitalize focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Semua Kategori</option>
          {kategoriList.map((kat, index) => (
            <option key={index} value={kat}>
              {kat}
            </option>
          ))}
        </select>
      </div>

      {produkTersaring.length === 0 ? (
        <p className="text-center mt-10 text-gray-500 font-medium">
          Produk tidak ditemukan.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produkDitampilkan.map((p) => (
              <ProdukCard key={p.id} produk={p} />
            ))}
          </div>

          {/* Kontrol Paginasi */}
          {totalHalaman > 1 && (
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                type="button"
                onClick={() => setHalaman((prev) => prev - 1)}
                disabled={halaman === 1}
                className="px-4 py-2 border rounded-md bg-gray-100 disabled:opacity-50 hover:bg-gray-200 cursor-pointer disabled:cursor-not-allowed transition font-medium text-sm"
              >
                Sebelumnya
              </button>

              <span className="text-sm font-medium text-gray-700">
                Halaman {halaman} dari {totalHalaman}
              </span>

              <button
                type="button"
                onClick={() => setHalaman((prev) => prev + 1)}
                disabled={halaman === totalHalaman}
                className="px-4 py-2 border rounded-md bg-gray-100 disabled:opacity-50 hover:bg-gray-200 cursor-pointer disabled:cursor-not-allowed transition font-medium text-sm"
              >
                Selanjutnya
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;