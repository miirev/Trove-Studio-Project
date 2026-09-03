import { useKeranjang } from "../context/KeranjangContext.jsx";

function Keranjang() {
  const { item, tambahKeKeranjang, kurangiKeKeranjang, hapusDariKeranjang } =
    useKeranjang();

  const total = (item || []).reduce(
    (sum, p) => sum + (p.harga || 0) * (p.qty || 1),
    0
  );

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Keranjang Belanja</h2>

      {!item || item.length === 0 ? (
        <p className="text-center text-gray-500">Keranjang Anda masih kosong.</p>
      ) : (
        <div className="space-y-4">
          {item.map((p) => (
            <div
              key={p.id}
              className="border p-4 rounded-lg flex items-center justify-between shadow-sm bg-white gap-4"
            >
              <div className="flex items-center gap-4 flex-1">
                {p.gambar && (
                  <img
                    src={p.gambar}
                    alt={p.nama}
                    className="w-20 h-20 object-contain rounded border p-1"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-base">{p.nama}</h3>
                  <p className="text-gray-600 text-sm">
                    Rp {(p.harga || 0).toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center border rounded-md overflow-hidden bg-gray-50">
                  <button
                    type="button"
                    onClick={() => kurangiKeKeranjang(p.id)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 font-bold"
                  >
                    -
                  </button>
                  <span className="px-3 font-semibold">{p.qty || 1}</span>
                  <button
                    type="button"
                    onClick={() => tambahKeKeranjang(p)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 font-bold"
                  >
                    +
                  </button>
                </div>

                <p className="font-bold w-24 text-right text-sm">
                  Rp {((p.harga || 0) * (p.qty || 1)).toLocaleString("id-ID")}
                </p>

                <button
                  type="button"
                  onClick={() => hapusDariKeranjang(p.id)}
                  className="text-red-500 hover:text-red-700 font-semibold text-xs ml-2"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}

          <div className="border-t pt-4 mt-6 flex justify-between items-center">
            <span className="text-lg font-bold">Total Pembayaran:</span>
            <span className="text-xl font-bold text-blue-600">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Keranjang;