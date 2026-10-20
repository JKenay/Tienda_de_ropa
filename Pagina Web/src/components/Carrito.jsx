import React from 'react';

export default function Carrito({ carrito, setCarrito, setVistaActual }) {
  const formatearCLP = (m) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(m);

  const cambiarCantidad = (id, delta) => {
    setCarrito(prev => prev.map(item => {
      if (item.id === id) {
        const nuevaCant = item.cantidad + delta;
        return nuevaCant > 0 ? { ...item, cantidad: nuevaCant } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const eliminarProducto = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  const total = carrito.reduce((acc, i) => acc + (i.precio * i.cantidad), 0);

  return (
    <div className="my-4">
      <h2 className="text-info mb-4">Tu Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <div className="alert alert-dark text-center py-5">
          <h4>Tu carrito está vacío</h4>
          <button className="btn btn-info text-dark fw-bold mt-3" onClick={() => setVistaActual('home')}>Ir al Catálogo</button>
        </div>
      ) : (
        <div className="row g-4">
          <div className="col-12 col-lg-8">
            {carrito.map(item => (
              <div key={item.id} className="card bg-secondary text-light mb-3 p-3 d-flex flex-row align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-3">
                  <img src={item.imagen} alt={item.nombre} style={{ width: '70px', height: '70px', objectFit: 'cover' }} className="rounded" />
                  <div>
                    <h5 className="mb-1">{item.nombre}</h5>
                    <p className="mb-0 text-info fw-bold">{formatearCLP(item.precio)} c/u</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-3">
                  <div className="btn-group btn-group-sm">
                    <button className="btn btn-dark" onClick={() => cambiarCantidad(item.id, -1)}>-</button>
                    <span className="btn btn-dark disabled text-light px-3">{item.cantidad}</span>
                    <button className="btn btn-dark" onClick={() => cambiarCantidad(item.id, 1)}>+</button>
                  </div>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => eliminarProducto(item.id)}>🗑️</button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-12 col-lg-4">
            <div className="card bg-secondary text-light p-4">
              <h4>Resumen del Pedido</h4>
              <hr />
              <div className="d-flex justify-content-between fs-5 fw-bold my-3">
                <span>Total:</span>
                <span className="text-info">{formatearCLP(total)}</span>
              </div>
              <button className="btn btn-info text-dark fw-bold w-100 py-2" onClick={() => { alert('¡Gracias por tu compra!'); setCarrito([]); setVistaActual('home'); }}>
                Procesar Pago
              </button>
              <button className="btn btn-outline-light w-100 mt-2 btn-sm" onClick={() => setCarrito([])}>Vaciar Carrito</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}