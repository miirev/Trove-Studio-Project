import { createContext, useContext, useState } from "react";

const KeranjangContext = createContext();

export function KeranjangProvider({ children }) {
  const [item, setItem] = useState([]);

  const tambahKeKeranjang = (produk) => {
    setItem((prevItem) => {
      const itemAda = prevItem.find((i) => i.id === produk.id);
      if (itemAda) {
        return prevItem.map((i) =>
          i.id === produk.id ? { ...i, qty: (i.qty || 1) + 1 } : i
        );
      }
      return [...prevItem, { ...produk, qty: 1 }];
    });
  };

  const kurangiKeKeranjang = (id) => {
    setItem((prevItem) => {
      const itemAda = prevItem.find((i) => i.id === id);
      if (itemAda && itemAda.qty === 1) {
        return prevItem.filter((i) => i.id !== id);
      }
      return prevItem.map((i) =>
        i.id === id ? { ...i, qty: i.qty - 1 } : i
      );
    });
  };

  const hapusDariKeranjang = (id) => {
    setItem((prevItem) => prevItem.filter((i) => i.id !== id));
  };

  return (
    <KeranjangContext.Provider
      value={{
        item,
        setItem,
        tambahKeKeranjang,
        kurangiKeKeranjang,
        hapusDariKeranjang,
      }}
    >
      {children}
    </KeranjangContext.Provider>
  );
}

export const useKeranjang = () => {
  return useContext(KeranjangContext);
};