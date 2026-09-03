import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import { useKeranjang } from '../context/KeranjangContext.jsx';

function ProdukCard({ produk }) {
  const { tambahKeKeranjang } = useKeranjang();

  const id = produk.id;
  const nama = produk.title || produk.nama;
  const gambar = produk.image || produk.gambar;
  const hargaUsd = produk.price || produk.harga || 0;

  const KURS_USD_TO_IDR = 15000;
  const hargaRupiah = Math.round(hargaUsd * KURS_USD_TO_IDR);

  const handleTambah = () => {
    tambahKeKeranjang(produk);
    alert(`"${nama}" berhasil ditambahkan ke keranjang!`);
  };

  return (
    <div className="relative border rounded-lg p-4 shadow hover:shadow-lg transition produk-card flex flex-col justify-between h-full bg-white">
      <div>
        <img
          src={gambar}
          className="w-full h-40 object-contain rounded p-2"
          alt={nama}
        />
        
        <h3 className="font-semibold mt-2 line-clamp-2 text-sm text-gray-800" title={nama}>
          {nama}
        </h3>
      </div>

      <div className="mt-3">
        <p className="text-blue-600 font-bold mb-3">
          Rp {hargaRupiah.toLocaleString('id-ID')}
        </p>

        <div className="flex flex-col items-center gap-2">
          <Link to={`/produk/${id}`} className="w-full">
            <Button text="Lihat Detail" />
          </Link>

          <button
            type="button"
            onClick={handleTambah}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer text-sm font-medium"
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProdukCard;