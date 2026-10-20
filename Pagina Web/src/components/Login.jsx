import React, { useState } from 'react';

export default function Login({ onLoginExitoso, setVistaActual }) {
  const [correo, setCorreo] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost/satis-factory-api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, pass })
      });
      const data = await res.json();

      if (data.exito) {
        onLoginExitoso(data.usuario);
      } else {
        setError(data.mensaje || 'Credenciales incorrectas');
      }
    } catch (err) {
      setError('Error al conectar con el servidor PHP');
    }
  };

  return (
    <div className="row justify-content-center my-5">
      <div className="col-12 col-md-5">
        <div className="card bg-secondary text-light p-4 shadow">
          <h3 className="text-info text-center mb-3">Iniciar Sesión</h3>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Correo Electrónico:</label>
              <input 
                type="email" 
                className="form-control bg-dark text-light border-secondary"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña:</label>
              <input 
                type="password" 
                className="form-control bg-dark text-light border-secondary"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                required 
              />
            </div>
            <button type="submit" className="btn btn-info text-dark fw-bold w-100 mb-2">Ingresar</button>
            <button 
              type="button" 
              className="btn btn-link text-light w-100 text-decoration-none btn-sm"
              onClick={() => setVistaActual('registro')}
            >
              ¿No tienes cuenta? Regístrate aquí
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}