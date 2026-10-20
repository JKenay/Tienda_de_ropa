import React from 'react';

export default function Nosotros() {
  return (
    <div className="my-4">
      <div className="card bg-secondary text-light p-4 p-md-5 border-0 shadow">
        <div className="row align-items-center g-4">
          <div className="col-12 col-lg-6">
            <h2 className="text-info fw-bold mb-3 display-6">Sobre satis-factory</h2>
            <p className="lead">
              En <strong>satis-factory</strong> fusionamos la pasión por la tecnología de vanguardia con la calidez del hardware de alta fidelidad.
            </p>
            <p>
              Nuestra tienda web nació como una propuesta integral para entusiastas del gaming, melómanos y profesionales del desarrollo que buscan componentes de primera calidad, periféricos de alta precisión y un servicio transparente.
            </p>
            <p>
              Ofrecemos una experiencia de navegación rápida y segura, respaldada por un catálogo curado e integraciones modernas para garantizar un flujo de compra óptimo desde cualquier dispositivo.
            </p>
            <div className="row g-3 mt-3">
              <div className="col-6">
                <div className="p-3 bg-dark rounded text-center border border-secondary">
                  <h4 className="text-info fw-bold mb-0">100%</h4>
                  <small className="text-secondary">Calidad Garantizada</small>
                </div>
              </div>
              <div className="col-6">
                <div className="p-3 bg-dark rounded text-center border border-secondary">
                  <h4 className="text-info fw-bold mb-0">24/7</h4>
                  <small className="text-secondary">Plataforma Web</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="p-4 bg-dark rounded border border-secondary">
              <h4 className="text-warning mb-3">Nuestra Misión</h4>
              <p className="small text-light opacity-75">
                Proporcionar acceso a productos tecnológicos premium, combinando la innovación digital con la riqueza táctil y sonora del mundo analógico.
              </p>
              <h4 className="text-info mb-3 mt-4">Estándares de Servicio</h4>
              <p className="small text-light opacity-75">
                Cada componente de nuestro catálogo es seleccionado bajo rigurosos criterios de rendimiento, durabilidad y compatibilidad.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}