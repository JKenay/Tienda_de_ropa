import React, { useState } from 'react';

export default function Catalogo({ productos, onAgregar, showToast }) {
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSel, setCategoriaSel] = useState('Todos');
  const [orden, setOrden] = useState('defecto');
  const [productoModal, setProductoModal] = useState(null);

  const formatearCLP = (m) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(m);

  // Obtener la lista única de categorías incluyendo "Todos"
  const categoriasDisponibles = ['Todos', ...new Set(productos.map(p => p.categoria || 'Varios'))];

  // Filtrado y ordenamiento en tiempo real
  const productosFiltrados = productos
    .filter(p => {
      const coincideNombre = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCategoria = categoriaSel === 'Todos' || p.categoria === categoriaSel;
      return coincideNombre && coincideCategoria;
    })
    .sort((a, b) => {
      if (orden === 'menor') return a.precio - b.precio;
      if (orden === 'mayor') return b.precio - a.precio;
      if (orden === 'nombre') return a.nombre.localeCompare(b.nombre);
      return 0;
    });

  const limpiarFiltros = () => {
    setBusqueda('');
    setCategoriaSel('Todos');
    setOrden('defecto');
  };

  return (
    <div className="my-4">
      {/* Banner Principal (Sin la etiqueta celeste con el rayo) */}
      <div className="p-4 p-md-5 mb-4 rounded-4 glass-card border border-info border-opacity-25 text-center position-relative overflow-hidden">
        <div className="position-relative z-1">
          <h1 className="display-4 fw-bold text-light mb-3">Hardware & Audio <span className="text-gradient">Analógico Premium</span></h1>
          <p className="lead text-secondary mx-auto mb-0" style={{ maxWidth: '650px' }}>
            Explora nuestra colección de periféricos de alta precisión, componentes analógicos y tecnología Hi-Fi.
          </p>
        </div>
      </div>

      {/* Panel de Filtros y Búsqueda */}
      <div className="glass-card p-3 p-md-4 mb-4">
        <div className="row g-3 align-items-center">
          <div className="col-12 col-md-6">
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-info"></span>
              <input 
                type="text" 
                className="form-control bg-dark text-light border-secondary"
                placeholder="Buscar producto por nombre..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
              {busqueda && (
                <button className="btn btn-outline-secondary text-light" type="button" onClick={() => setBusqueda('')}>✕</button>
              )}
            </div>
          </div>

          <div className="col-12 col-md-4">
            <select className="form-select bg-dark text-light border-secondary" value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="defecto">Ordenar por: Destacados</option>
              <option value="menor">Precio: Menor a Mayor</option>
              <option value="mayor">Precio: Mayor a Menor</option>
              <option value="nombre">Nombre: A - Z</option>
            </select>
          </div>

          <div className="col-12 col-md-2 text-end">
            <button className="btn btn-outline-info w-100 btn-sm py-2 fw-bold" onClick={limpiarFiltros}>Limpiar</button>
          </div>
        </div>

        {/* Botones de Categorías con Resaltado Claro */}
        <div className="d-flex flex-wrap gap-2 mt-3 pt-3 border-top border-secondary border-opacity-25 align-items-center">
          <small className="text-secondary me-2 fw-bold">Categorías:</small>
          {categoriasDisponibles.map(cat => {
            const estaActivo = categoriaSel === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategoriaSel(cat)}
                className={`btn btn-sm rounded-pill px-3 transition-all ${
                  estaActivo 
                    ? 'bg-info text-dark fw-bold border-info shadow' 
                    : 'btn-dark text-white border-secondary'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Contador de Resultados */}
      <div className="d-flex justify-content-between align-items-center mb-3 px-1">
        <span className="text-secondary small">
          Mostrando <strong className="text-info">{productosFiltrados.length}</strong> de <strong>{productos.length}</strong> productos
        </span>
      </div>

      {/* Grid de Tarjetas de Productos */}
      {productosFiltrados.length === 0 ? (
        <div className="glass-card text-center py-5 my-4">
          <h4 className="text-light">No se encontraron productos</h4>
          <p className="text-secondary">Intenta ajustando tu búsqueda o selección de categoría.</p>
          <button className="btn btn-neon mt-2" onClick={limpiarFiltros}>Ver Todo el Catálogo</button>
        </div>
      ) : (
        <div className="row g-4">
          {productosFiltrados.map(p => (
            <div key={p.id} className="col-12 col-sm-6 col-lg-4">
              <div className="card glass-card h-100 border-0 p-3" style={{ background: '#111827', color: '#ffffff' }}>
                <div className="position-relative overflow-hidden rounded-3 mb-3">
                  <img 
                    src={p.imagen} 
                    className="card-img-top rounded-3" 
                    alt={p.nombre} 
                    style={{ height: '210px', objectFit: 'cover', cursor: 'pointer' }}
                    onClick={() => setProductoModal(p)} 
                  />
                  <span className="position-absolute top-0 end-0 m-2 badge bg-dark text-info border border-info rounded-pill">
                    {p.categoria || 'Hardware'}
                  </span>
                </div>
                
                <div className="d-flex flex-column flex-grow-1 justify-content-between">
                  <div>
                    <h5 className="fw-bold mb-2 text-white" style={{ cursor: 'pointer' }} onClick={() => setProductoModal(p)}>
                      {p.nombre}
                    </h5>
                    <p className="fs-4 fw-bold text-info mb-3">
                      {formatearCLP(p.precio)}
                    </p>
                  </div>

                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-neon w-100 fw-bold"
                      onClick={() => { onAgregar(p); showToast(`¡${p.nombre} agregado al carrito!`); }}
                    >
                      Añadir +
                    </button>
                    <button 
                      className="btn btn-outline-info btn-sm fw-bold px-3" 
                      onClick={() => setProductoModal(p)}
                    >
                      Detalles
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Desplegable de Detalles */}
      {productoModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content glass-card border border-info border-opacity-50 text-light p-3">
              <div className="modal-header border-0">
                <h5 className="modal-title fw-bold text-info">{productoModal.nombre}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setProductoModal(null)}></button>
              </div>
              
              <div className="modal-body text-center">
                <img 
                  src={productoModal.imagen} 
                  alt={productoModal.nombre} 
                  className="img-fluid rounded-3 mb-3" 
                  style={{ maxHeight: '220px', objectFit: 'cover' }} 
                />
                <p className="fs-3 fw-bold text-info mb-2">{formatearCLP(productoModal.precio)}</p>
                <span className="badge bg-secondary mb-3">{productoModal.categoria || 'Hardware General'}</span>

                <div className="p-3 bg-dark bg-opacity-75 rounded-3 text-start mb-3 border border-secondary border-opacity-50">
                  <h6 className="text-info fw-bold mb-2">Características Principales:</h6>
                  <ul className="mb-0 text-light small">
                    <li>Componentes de alta durabilidad e integración analógico/digital.</li>
                    <li>Garantía directa satis-factory de 12 meses.</li>
                    <li>Despacho express disponible a todo Chile.</li>
                    <li>Soporte y asesoría técnica personalizada.</li>
                  </ul>
                </div>
              </div>

              <div className="modal-footer border-0">
                <button className="btn btn-outline-secondary" onClick={() => setProductoModal(null)}>Cerrar</button>
                <button 
                  className="btn btn-neon fw-bold"
                  onClick={() => {
                    onAgregar(productoModal);
                    showToast(`¡${productoModal.nombre} añadido!`);
                    setProductoModal(null);
                  }}
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}