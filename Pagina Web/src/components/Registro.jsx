import React, { useState } from 'react';

export default function Registro({ onRegistroExitoso, setVistaActual }) {
  const [form, setForm] = useState({ run: '', nombre: '', correo: '', pass: '' });

  const validateRun = (run) => /^[0-9]{7,8}[0-9kK]{1}$/.test(run.trim());
  const validateCorreo = (correo) => ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"].some(d => correo.trim().endsWith(d));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateRun(form.run) || !validateCorreo(form.correo)) {
      alert("Por favor corrige los campos con formato inválido.");
      return;
    }

    try {
      const res = await fetch('http://localhost/satis-factory-api/registro.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.exito) {
        alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        onRegistroExitoso();
      } else {
        alert(data.mensaje || "Error al registrar");
      }
    } catch (err) {
      alert("Error al conectar con el servidor PHP.");
    }
  };

  return (
    <div className="row justify-content-center my-4">
      <div className="col-12 col-md-6">
        <div className="card bg-secondary text-light p-4 shadow">
          <h3 className="text-info text-center mb-3">Registro de Usuario</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">RUN (sin puntos ni guión):</label>
              <input 
                type="text" 
                className={`form-control bg-dark text-light border-secondary ${form.run ? (validateRun(form.run) ? 'is-valid' : 'is-invalid') : ''}`}
                value={form.run}
                onChange={(e) => setForm({ ...form, run: e.target.value })}
                placeholder="Ej: 19011022K"
                required
              />
              <small className={validateRun(form.run) ? 'text-success' : 'text-warning'}>
                {validateRun(form.run) ? '✓ RUN válido' : 'Formato: 19011022K'}
              </small>
            </div>
            <div className="mb-3">
              <label className="form-label">Nombre Completo:</label>
              <input 
                type="text" 
                className="form-control bg-dark text-light border-secondary"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico:</label>
              <input 
                type="email" 
                className={`form-control bg-dark text-light border-secondary ${form.correo ? (validateCorreo(form.correo) ? 'is-valid' : 'is-invalid') : ''}`}
                value={form.correo}
                onChange={(e) => setForm({ ...form, correo: e.target.value })}
                placeholder="usuario@duoc.cl"
                required
              />
              <small className={validateCorreo(form.correo) ? 'text-success' : 'text-warning'}>
                {validateCorreo(form.correo) ? '✓ Dominio válido' : 'Dominios: @duoc.cl, @profesor.duoc.cl, @gmail.com'}
              </small>
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña:</label>
              <input 
                type="password" 
                className="form-control bg-dark text-light border-secondary"
                value={form.pass}
                onChange={(e) => setForm({ ...form, pass: e.target.value })}
                required 
              />
            </div>
            <button type="submit" className="btn btn-info text-dark fw-bold w-100 mb-2">Crear Cuenta</button>
            <button 
              type="button" 
              className="btn btn-link text-light w-100 text-decoration-none btn-sm"
              onClick={() => setVistaActual('login')}
            >
              ¿Ya tienes cuenta? Inicia sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}