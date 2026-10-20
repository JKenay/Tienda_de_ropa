import React from 'react';

export default function Header({ vistaActual, setVistaActual, cantCarrito, usuarioActivo, onLogout }) {
  return (
    <header className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-secondary px-3 sticky-top">
      <div className="container-fluid">
        <span className="navbar-brand fw-bold text-info fs-4" style={{ cursor: 'pointer' }} onClick={() => setVistaActual('home')}>
           satis<span className="text-light">-factory</span>
        </span>
        <div className="d-flex align-items-center gap-3">
          <button 
            className={`btn btn-link nav-link ${vistaActual === 'home' ? 'text-info fw-bold' : 'text-light'}`} 
            onClick={() => setVistaActual('home')}
          >
            Catálogo
          </button>
          <button 
            className={`btn btn-link nav-link ${vistaActual === 'blog' ? 'text-info fw-bold' : 'text-light'}`} 
            onClick={() => setVistaActual('blog')}
          >
            Blog
          </button>
          <button 
            className={`btn btn-link nav-link ${vistaActual === 'nosotros' ? 'text-info fw-bold' : 'text-light'}`} 
            onClick={() => setVistaActual('nosotros')}
          >
            Nosotros
          </button>
          {usuarioActivo && (
            <button 
              className={`btn btn-link nav-link text-warning ${vistaActual === 'admin' ? 'fw-bold' : ''}`} 
              onClick={() => setVistaActual('admin')}
            >
              Admin
            </button>
          )}
        </div>

        <div className="d-flex align-items-center gap-2 mt-2 mt-lg-0">
          {!usuarioActivo ? (
            <>
              <button 
                className={`btn btn-outline-info btn-sm ${vistaActual === 'login' ? 'active' : ''}`} 
                onClick={() => setVistaActual('login')}
              >
                Iniciar Sesión
              </button>
              <button 
                className={`btn btn-info btn-sm text-dark fw-bold ${vistaActual === 'registro' ? 'active' : ''}`} 
                onClick={() => setVistaActual('registro')}
              >
                Crear Cuenta
              </button>
            </>
          ) : (
            <div className="d-flex align-items-center gap-2 me-2">
              <span className="badge bg-secondary">👤 {usuarioActivo.nombre || usuarioActivo.correo}</span>
              <button className="btn btn-outline-danger btn-sm" onClick={onLogout}>Salir</button>
            </div>
          )}
          <button 
            className="btn btn-secondary btn-sm position-relative ms-2"
            onClick={() => setVistaActual('carrito')}
          >
             Carrito <span className="badge bg-danger">{cantCarrito}</span>
          </button>
        </div>
      </div>
    </header>
  );
}