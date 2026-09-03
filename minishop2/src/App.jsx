import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Footer from './components/Footer.jsx';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Detailproduk from './pages/Detailproduk.jsx';
import Layout from './components/Layout.jsx';
import { KeranjangProvider } from './context/KeranjangContext.jsx';
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from './components/ProtectedRoute.jsx';
import NotFound from "./pages/NotFound";
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import RiwayatPesanan from "./pages/RiwayatPesanan";
import { lazy, Suspense } from 'react';

const Keranjang = lazy(() => import("./pages/Keranjang"));

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <KeranjangProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/produk/:id" element={<Detailproduk />} />
            
            <Route 
              path="/keranjang" 
              element={
                <ProtectedRoute>
                  <Suspense fallback={<p className="text-center py-10">Memuat...</p>}>
                    <Keranjang />
                  </Suspense>
                </ProtectedRoute>
              } 
            />

            <Route 
              path="/riwayat" 
              element={
                <ProtectedRoute>
                  <RiwayatPesanan />
                </ProtectedRoute>
              } 
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </KeranjangProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;