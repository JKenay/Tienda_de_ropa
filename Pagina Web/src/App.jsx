import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Catalogo from './components/Catalogo';
import Blog from './components/Blog';
import Nosotros from './components/Nosotros';
import Login from './components/Login';
import Registro from './components/Registro';
import Carrito from './components/Carrito';
import AdminPanel from './components/AdminPanel';
import Footer from './components/Footer';

const API_URL = 'http://localhost/satis-factory-api';

const PRODUCTOS_DEMO = [
  { id: 1, codigo: "PROD-001", nombre: "Teclado Mecánico RGB Hall Effect", categoria: "Periféricos", precio: 89990, imagen: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&q=80" },
  { id: 2, codigo: "PROD-002", nombre: "Mouse Wireless Ultralight 4K", categoria: "Periféricos", precio: 45990, imagen: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80" },
  { id: 3, codigo: "PROD-003", nombre: "Monitor Gaming 27 165Hz QHD", categoria: "Monitores", precio: 229990, imagen: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80" },
  { id: 4, codigo: "PROD-004", nombre: "DAC & Amplificador a Tubos Hi-Fi", categoria: "Audio", precio: 149990, imagen: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&q=80" },
  { id: 5, codigo: "PROD-005", nombre: "Auriculares Abiertos Audiófilo 50mm", categoria: "Audio", precio: 119990, imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80" },
  { id: 6, codigo: "PROD-006", nombre: "Monitor Ultrawide 34 Curved 144Hz", categoria: "Monitores", precio: 389990, imagen: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&q=80" },
  { id: 7, codigo: "PROD-007", nombre: "Mousepad XL Micro-Texturizado RGB", categoria: "Periféricos", precio: 19990, imagen: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&q=80" },
  { id: 8, codigo: "PROD-008", nombre: "Micrófono Estudio XLR Cardioide", categoria: "Audio", precio: 79990, imagen: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80" },
  { id: 9, codigo: "PROD-009", nombre: "Escalador Vídeo Analógico retro-RGB", categoria: "Componentes", precio: 64990, imagen: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80" }
];

export default function App() {
  const [vistaActual, setVistaActual] = useState('home');
  const [productos, setProductos] = useState(PRODUCTOS_DEMO);
  const [carrito, setCarrito] = useState(() => JSON.parse(localStorage.getItem('sf_carrito')) || []);
  const [usuarioActivo, setUsuarioActivo] = useState(() => JSON.parse(localStorage.getItem('sf_sesion')) || null);

  useEffect(() => {
    fetch(`${API_URL}/productos.php`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setProductos(data);
      })
      .catch(() => console.log("Cargando productos de respaldo local..."));
  }, []);

  useEffect(() => {
    localStorage.setItem('sf_carrito', JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito(prev => {
      const existe = prev.find(i => i.id === producto.id);
      if (existe) return prev.map(i => i.id === producto.id ? { ...i, cantidad: i.cantidad + 1 } : i);
      return [...prev, { ...producto, cantidad: 1 }];
    });
  };

  const handleLoginExitoso = (usuario) => {
    setUsuarioActivo(usuario);
    localStorage.setItem('sf_sesion', JSON.stringify(usuario));
    setVistaActual('home');
  };

  const handleLogout = () => {
    setUsuarioActivo(null);
    localStorage.removeItem('sf_sesion');
    setVistaActual('home');
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      <Header 
        vistaActual={vistaActual} 
        setVistaActual={setVistaActual}
        cantCarrito={carrito.reduce((acc, i) => acc + i.cantidad, 0)}
        usuarioActivo={usuarioActivo}
        onLogout={handleLogout}
      />
      
      <main className="container my-4 flex-grow-1">
        {(vistaActual === 'home' || vistaActual === 'catalogo') && (
          <Catalogo productos={productos} onAgregar={agregarAlCarrito} />
        )}
        {vistaActual === 'blog' && <Blog />}
        {vistaActual === 'nosotros' && <Nosotros />}
        {vistaActual === 'login' && <Login onLoginExitoso={handleLoginExitoso} setVistaActual={setVistaActual} />}
        {vistaActual === 'registro' && <Registro onRegistroExitoso={() => setVistaActual('login')} setVistaActual={setVistaActual} />}
        {vistaActual === 'carrito' && <Carrito carrito={carrito} setCarrito={setCarrito} setVistaActual={setVistaActual} />}
        {vistaActual === 'admin' && <AdminPanel productos={productos} setProductos={setProductos} />}
      </main>

      <Footer />
    </div>
  );
}