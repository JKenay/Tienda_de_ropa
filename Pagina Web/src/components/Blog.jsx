import React, { useState } from 'react';

export default function Blog() {
  const articulos = [
    {
      id: 1,
      titulo: "El Renacimiento del Sonido Analógico en la Era Digital",
      fecha: "12 Octubre, 2026",
      categoria: "Audio & Hi-Fi",
      imagen: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80",
      resumen: "Por qué audiófilos y gamers están volviendo a los DACs analógicos, amplificadores a tubos y vinilos para obtener una fidelidad sonora pura.",
      contenido: "En la era del streaming comprimido, los entusiastas buscan la calidez y el rango dinámico sin recortes. Los circuitos analógicos puros eliminan el jitter y entregan armónicos naturales que las tarjetas integradas sencillas suelen distorsionar."
    },
    {
      id: 2,
      titulo: "Teclados Mecánicos e Interruptores Analógicos Hall Effect",
      fecha: "05 Octubre, 2026",
      categoria: "Hardware & Periféricos",
      imagen: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
      resumen: "La tecnología magnética permite medir el recorrido milimétrico de las teclas. Analizamos cómo el accionamiento analógico revoluciona el juego.",
      contenido: "A diferencia del interruptor binario convencional (encendido/apagado), los switches con sensor de efecto Hall detectan la posición exacta de la tecla, permitiendo aceleración gradual en juegos de carreras o movimientos analógicos precisos en FPS."
    },
    {
      id: 3,
      titulo: "Retro-Gaming: Monitores CRT y Escaladores Analógicos",
      fecha: "28 Septiembre, 2026",
      categoria: "Retro Tech",
      imagen: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&q=80",
      resumen: "El encanto de la latencia cero y el suavizado de imagen natural en tubos catódicos.",
      contenido: "Los monitores CRT no sufren del tiempo de respuesta del píxel LCD ni de problemas de escalado de resolución fija. Para la preservación de videojuegos analógicos, siguen siendo la referencia absoluta en fidelidad visual."
    }
  ];

  const [articuloModal, setArticuloModal] = useState(null);

  return (
    <div className="my-4">
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold text-info mb-2">Blog satis-factory</h2>
        <p className="text-secondary lead">Novedades sobre hardware, fidelidad de audio analógica y tendencia tech.</p>
      </div>

      <div className="row g-4">
        {articulos.map(art => (
          <div key={art.id} className="col-12 col-md-4">
            <div className="card glass-card h-100 border-0 p-3 text-light" style={{ background: '#111827' }}>
              <img src={art.imagen} className="card-img-top rounded-3 mb-3" alt={art.titulo} style={{ height: '190px', objectFit: 'cover' }} />
              <div className="d-flex justify-content-between text-info small mb-2">
                <span>{art.categoria}</span>
                <span>{art.fecha}</span>
              </div>
              <h5 className="fw-bold mb-2 text-white">{art.titulo}</h5>
              <p className="text-secondary small flex-grow-1">{art.resumen}</p>
              
              <div className="mt-3 pt-2 border-top border-secondary border-opacity-25 text-end">
                <button className="btn btn-outline-info btn-sm rounded-pill fw-bold w-100" onClick={() => setArticuloModal(art)}>
                  Leer Completo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {articuloModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}>
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content glass-card p-4 text-light" style={{ background: '#111827' }}>
              <div className="modal-header border-0">
                <h4 className="fw-bold text-info">{articuloModal.titulo}</h4>
                <button className="btn-close btn-close-white" onClick={() => setArticuloModal(null)}></button>
              </div>
              <div className="modal-body">
                <img src={articuloModal.imagen} className="img-fluid rounded-3 mb-4 w-100" style={{ maxHeight: '300px', objectFit: 'cover' }} alt="Blog" />
                <p className="lead text-light">{articuloModal.resumen}</p>
                <p className="text-secondary">{articuloModal.contenido}</p>
              </div>
              <div className="modal-footer border-0">
                <button className="btn btn-neon fw-bold" onClick={() => setArticuloModal(null)}>Cerrar Lectura</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}