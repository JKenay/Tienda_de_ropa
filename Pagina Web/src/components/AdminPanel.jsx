import React, { useState } from 'react';

export default function AdminPanel({ productos = [], setProductos }) {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    categoria: 'Periféricos',
    precio: '',
    imagen: ''
  });

  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto(prev => ({ ...prev, [name]: value }));
  };

  // Enviar datos al Backend PHP / MySQL
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nuevoProducto.nombre.trim() || !nuevoProducto.precio) {
      setMensaje({ tipo: 'danger', texto: 'Por favor completa al menos el nombre y el precio.' });
      return;
    }

    setCargando(true);
    setMensaje(null);

    const payload = {
      nombre: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion,
      categoria: nuevoProducto.categoria,
      precio: Number(nuevoProducto.precio),
      imagen: nuevoProducto.imagen || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f'
    };

    try {
      const response = await fetch('http://localhost/satis-factory-api/productos.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        setMensaje({ tipo: 'success', texto: '¡Producto guardado exitosamente en MySQL!' });
        
        // Actualizar el estado global de React
        const prodGuardado = { id: data.id || Date.now(), ...payload };
        if (setProductos) {
          setProductos(prev => [prodGuardado, ...prev]);
        }

        // Limpiar formulario
        setNuevoProducto({
          nombre: '',
          descripcion: '',
          categoria: 'Periféricos',
          precio: '',
          imagen: ''
        });
      } else {
        throw new Error(data.message || 'Error al guardar el producto');
      }
    } catch (err) {
      console.warn('PHP/MySQL no disponible. Guardando en estado local de emergencia:', err);
      
      const prodGuardado = { id: Date.now(), ...payload };
      if (setProductos) {
        setProductos(prev => [prodGuardado, ...prev]);
      }

      setMensaje({ tipo: 'warning', texto: 'Producto agregado en memoria local (Servidor PHP desconectado).' });
      
      setNuevoProducto({
        nombre: '',
        descripcion: '',
        categoria: 'Periféricos',
        precio: '',
        imagen: ''
      });
    } finally {
      setCargando(false);
    }
  };

  // Eliminar producto de la lista y BD
  const handleEliminar = async (id) => {
    if (!window.confirm('¿Deseas eliminar este producto del catálogo?')) return;

    try {
      await fetch(`http://localhost/satis-factory-api/productos.php?id=${id}`, {
        method: 'DELETE'
      });
    } catch (e) {
      console.warn('Eliminación efectuada solo en memoria local.');
    }

    if (setProductos) {
      setProductos(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="container py-4">
      <h2 className="text-warning fw-bold mb-4">
        Panel de Administración <span className="text-white fs-5">(Gestión de Productos)</span>
      </h2>

      {/* Alertas de Notificación */}
      {mensaje && (
        <div className={`alert alert-${mensaje.tipo} alert-dismissible fade show`} role="alert">
          {mensaje.texto}
          <button type="button" className="btn-close" onClick={() => setMensaje(null)}></button>
        </div>
      )}

      {/* Formulario de Agregar Producto */}
      <div className="card bg-dark text-white border-secondary mb-5 shadow-lg" style={{ borderRadius: '12px' }}>
        <div className="card-header bg-secondary text-warning fw-bold fs-5">
          Agregar Nuevo Producto a MySQL
        </div>
        
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              
              {/* Recuadro 1: Nombre */}
              <div className="col-md-4">
                <label htmlFor="nombre" className="form-label text-warning fw-semibold">
                  1. Nombre del Producto *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Ej: Teclado Mecánico RGB"
                  value={nuevoProducto.nombre}
                  onChange={handleChange}
                  required
                  style={{ color: '#ffffff', backgroundColor: '#1e2530' }}
                />
              </div>

              {/* Recuadro 2: Descripción */}
              <div className="col-md-4">
                <label htmlFor="descripcion" className="form-label text-warning fw-semibold">
                  2. Descripción / Detalle
                </label>
                <input
                  type="text"
                  id="descripcion"
                  name="descripcion"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Ej: Switches azules, retroiluminado"
                  value={nuevoProducto.descripcion}
                  onChange={handleChange}
                  style={{ color: '#ffffff', backgroundColor: '#1e2530' }}
                />
              </div>

              {/* Recuadro 3: Categoría */}
              <div className="col-md-4">
                <label htmlFor="categoria" className="form-label text-warning fw-semibold">
                  3. Categoría
                </label>
                <select
                  id="categoria"
                  name="categoria"
                  className="form-select bg-dark text-white border-secondary"
                  value={nuevoProducto.categoria}
                  onChange={handleChange}
                  style={{ color: '#ffffff', backgroundColor: '#1e2530' }}
                >
                  <option value="Periféricos">Periféricos</option>
                  <option value="Audio">Audio</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Retro">Retro</option>
                  <option value="Accesorios">Accesorios</option>
                </select>
              </div>

              {/* Recuadro 4: Precio */}
              <div className="col-md-4">
                <label htmlFor="precio" className="form-label text-warning fw-semibold">
                  4. Precio ($ CLP) *
                </label>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  min="0"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="Ej: 45000"
                  value={nuevoProducto.precio}
                  onChange={handleChange}
                  required
                  style={{ color: '#ffffff', backgroundColor: '#1e2530' }}
                />
              </div>

              {/* Recuadro 5: Imagen URL */}
              <div className="col-md-8">
                <label htmlFor="imagen" className="form-label text-warning fw-semibold">
                  5. URL de la Imagen
                </label>
                <input
                  type="url"
                  id="imagen"
                  name="imagen"
                  className="form-control bg-dark text-white border-secondary"
                  placeholder="https://images.unsplash.com/photo-..."
                  value={nuevoProducto.imagen}
                  onChange={handleChange}
                  style={{ color: '#ffffff', backgroundColor: '#1e2530' }}
                />
              </div>

              {/* Botón de Envío */}
              <div className="col-12 mt-4">
                <button
                  type="submit"
                  className="btn btn-warning w-100 fw-bold py-2 fs-5 shadow"
                  disabled={cargando}
                >
                  {cargando ? 'Guardando...' : 'Guardar Producto en BD'}
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>

      {/* Tabla de Productos Existentes */}
      <div className="card bg-dark text-white border-secondary shadow-lg">
        <div className="card-header bg-secondary text-white fw-bold fs-5">
          Inventario Actual ({productos.length} productos)
        </div>
        <div className="card-body p-0 table-responsive">
          <table className="table table-dark table-hover align-middle mb-0">
            <thead>
              <tr className="text-warning border-secondary">
                <th>ID</th>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th className="text-center">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-muted">
                    No hay productos registrados en la base de datos.
                  </td>
                </tr>
              ) : (
                productos.map((prod) => (
                  <tr key={prod.id} className="border-secondary">
                    <td>{prod.id}</td>
                    <td>
                      <img
                        src={prod.imagen || 'https://via.placeholder.com/50'}
                        alt={prod.nombre}
                        style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '6px' }}
                      />
                    </td>
                    <td className="fw-semibold">{prod.nombre}</td>
                    <td><span className="badge bg-secondary">{prod.categoria}</span></td>
                    <td className="text-info fw-bold">
                      ${Number(prod.precio).toLocaleString('es-CL')}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleEliminar(prod.id)}
                        className="btn btn-outline-danger btn-sm"
                        title="Eliminar producto"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}