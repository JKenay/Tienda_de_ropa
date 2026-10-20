import React, { useState } from 'react';

export default function AdminPanel({ productos, setProductos }) {
  const [form, setForm] = useState({ codigo: '', nombre: '', categoria: 'Periféricos', precio: '', imagen: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost/satis-factory-api/productos.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, precio: parseInt(form.precio) })
      });
      const data = await res.json();
      if (data.exito) {
        alert("¡Producto agregado exitosamente!");
        setProductos(prev => [{ ...form, id: data.id, precio: parseInt(form.precio) }, ...prev]);
        setForm({ codigo: '', nombre: '', categoria: 'Periféricos', precio: '', imagen: '' });
      }
    } catch (err) {
      alert("Error al agregar el producto.");
    }
  };

  return (
    <div className="my-4">
      <h2 className="text-warning mb-4">⚡ Panel de Administración (Gestión de Productos)</h2>
      <div className="card bg-secondary text-light p-4 mb-5">
        <h4>Agregar Nuevo Producto a MySQL</h4>
        <form onSubmit={handleSubmit} className="row g-3 mt-1">
          <div className="col-md-3">
            <input type="text" className="form-control bg-dark text-light border-secondary" placeholder="Código (ej: PROD-005)" value={form.codigo} onChange={e => setForm({ ...form, codigo: e.target.value })} required />
          </div>
          <div className="col-md-3">
            <input type="text" className="form-control bg-dark text-light border-secondary" placeholder="Nombre" value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} required />
          </div>
          <div className="col-md-2">
            <select className="form-select bg-dark text-light border-secondary" value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })}>
              <option value="Periféricos">Periféricos</option>
              <option value="Monitores">Monitores</option>
              <option value="Audio">Audio</option>
            </select>
          </div>
          <div className="col-md-2">
            <input type="number" className="form-control bg-dark text-light border-secondary" placeholder="Precio ($)" value={form.precio} onChange={e => setForm({ ...form, precio: e.target.value })} required />
          </div>
          <div className="col-md-2">
            <input type="url" className="form-control bg-dark text-light border-secondary" placeholder="URL Imagen" value={form.imagen} onChange={e => setForm({ ...form, imagen: e.target.value })} required />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-warning fw-bold text-dark w-100">Guardar Producto en BD</button>
          </div>
        </form>
      </div>
    </div>
  );
}