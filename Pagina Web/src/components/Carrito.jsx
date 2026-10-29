import React, { useState } from 'react';

export default function Carrito({ carrito = [], setCarrito, setVistaActual }) {
  const [codigoCupon, setCodigoCupon] = useState('');
  const [descuento, setDescuento] = useState(0); // Porcentaje de descuento (ej: 0.10 para 10%)
  const [mensajeCupon, setMensajeCupon] = useState(null);

  // Modificar cantidad de un ítem
  const actualizarCantidad = (id, cambio) => {
    setCarrito(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nuevaCantidad = item.cantidad + cambio;
          return nuevaCantidad > 0 ? { ...item, cantidad: nuevaCantidad } : item;
        }
        return item;
      })
    );
  };

  // Eliminar ítem del carrito
  const eliminarItem = (id) => {
    setCarrito(prev => prev.filter(item => item.id !== id));
  };

  // Vaciar carrito completo
  const vaciarCarrito = () => {
    setCarrito([]);
    setDescuento(0);
    setMensajeCupon(null);
  };

  // Validar Cupón de Descuento
  const aplicarCupon = (e) => {
    e.preventDefault();
    const cupónLimpio = codigoCupon.trim().toUpperCase();

    if (cupónLimpio === 'DUOC2026') {
      setDescuento(0.10); // 10% de descuento
      setMensajeCupon({ tipo: 'success', texto: '¡Cupón DUOC2026 aplicado! (10% Dcto.)' });
    } else if (cupónLimpio === '') {
      setMensajeCupon({ tipo: 'warning', texto: 'Ingresa un código de cupón.' });
    } else {
      setDescuento(0);
      setMensajeCupon({ tipo: 'danger', texto: 'Cupón inválido o expirado.' });
    }
  };

  // Cálculos financieros
  const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const montoDescuento = subtotal * descuento;
  const total = subtotal - montoDescuento;

  if (carrito.length === 0) {
    return (
      <div className="container py-5 text-center text-white">
        <h2 className="text-info fw-bold mb-3">Tu Carrito está vacío</h2>
        <p className="text-muted mb-4">Explora nuestro catálogo para agregar componentes y periféricos.</p>
        <button className="btn btn-info fw-bold px-4 py-2" onClick={() => setVistaActual('catalogo')}>
          Ir al Catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="text-info fw-bold mb-4">Tu Carrito de Compras</h2>

      <div className="row g-4">
        {/* Lista de productos en el carrito */}
        <div className="col-lg-8">
          {carrito.map(item => (
            <div
              key={item.id}
              className="card bg-dark text-white border-secondary mb-3 p-3 shadow-sm"
              style={{ borderRadius: '10px' }}
            >
              <div className="d-flex align-items-center justify-content-between flex-wrap gap-3">
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={item.imagen || 'https://via.placeholder.com/80'}
                    alt={item.nombre}
                    style={{ width: '70px', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div>
                    <h5 className="mb-1 text-white">{item.nombre}</h5>
                    <span className="text-info fw-bold">
                      ${Number(item.precio).toLocaleString('es-CL')} c/u
                    </span>
                  </div>
                </div>

                {/* Controles de Cantidad */}
                <div className="d-flex align-items-center gap-2">
                  <div className="btn-group border border-secondary rounded" role="group">
                    <button
                      className="btn btn-dark text-white btn-sm px-2"
                      onClick={() => actualizarCantidad(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="btn btn-dark text-white btn-sm px-3 disabled fw-bold" style={{ opacity: 1 }}>
                      {item.cantidad}
                    </span>
                    <button
                      className="btn btn-dark text-white btn-sm px-2"
                      onClick={() => actualizarCantidad(item.id, 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Botón Eliminar */}
                  <button
                    className="btn btn-outline-danger btn-sm p-2 ms-2"
                    onClick={() => eliminarItem(item.id)}
                    title="Eliminar producto"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen del Pedido y Cupón */}
        <div className="col-lg-4">
          <div className="card bg-dark text-white border-secondary p-4 shadow-lg" style={{ borderRadius: '12px' }}>
            <h4 className="fw-bold mb-4 border-bottom border-secondary pb-2">Resumen del Pedido</h4>

            {/* Formulario de Cupón de Descuento */}
            <form onSubmit={aplicarCupon} className="mb-3">
              <label htmlFor="cuponInput" className="form-label text-warning small fw-bold">
                ¿Tienes un cupón de descuento?
              </label>
              <div className="input-group">
                <input
                  type="text"
                  id="cuponInput"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Ej: DUOC2026"
                  value={codigoCupon}
                  onChange={(e) => setCodigoCupon(e.target.value)}
                  style={{ backgroundColor: '#1e2530', color: '#ffffff' }}
                />
                <button type="submit" className="btn btn-outline-warning fw-bold">
                  Aplicar
                </button>
              </div>
            </form>

            {/* Mensaje del Cupón */}
            {mensajeCupon && (
              <div className={`alert alert-${mensajeCupon.tipo} py-2 small mb-3`} role="alert">
                {mensajeCupon.texto}
              </div>
            )}

            {/* Desglose de Precios */}
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Subtotal:</span>
              <span className="fw-bold">${subtotal.toLocaleString('es-CL')}</span>
            </div>

            {descuento > 0 && (
              <div className="d-flex justify-content-between mb-2 text-success">
                <span>Descuento (10%):</span>
                <span className="fw-bold">-${montoDescuento.toLocaleString('es-CL')}</span>
              </div>
            )}

            <div className="d-flex justify-content-between fs-4 fw-bold my-3 pt-2 border-top border-secondary">
              <span>Total:</span>
              <span className="text-info">${total.toLocaleString('es-CL')}</span>
            </div>

            {/* Acciones */}
            <button
              className="btn btn-info w-100 fw-bold py-2 mb-2 text-dark shadow"
              onClick={() => alert('¡Petición de pago simulada con éxito!')}
            >
              Procesar Pago
            </button>

            <button className="btn btn-outline-secondary w-100 btn-sm" onClick={vaciarCarrito}>
              Vaciar Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}