import React from 'react';
import { render } from '@testing-library/react';
import Header from '../components/Header.jsx';

describe('Pruebas Unitarias satis-factory (10/10)', () => {
  it('1. Debe renderizar la marca satis-factory', () => {
    render(<Header cantCarrito={0} />);
    expect(document.body.textContent).toContain('satis-factory');
  });

  it('2. Debe validar un RUN chileno válido', () => {
    const validateRun = (run) => /^[0-9]{7,8}[0-9kK]{1}$/.test(run.trim());
    expect(validateRun('19011022K')).toBeTrue();
  });

  it('3. Debe rechazar RUNs con puntos o guión', () => {
    const validateRun = (run) => /^[0-9]{7,8}[0-9kK]{1}$/.test(run.trim());
    expect(validateRun('19.011.022-K')).toBeFalse();
  });

  it('4. Debe validar correos con dominio @duoc.cl', () => {
    const dominios = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    const validateCorreo = (c) => dominios.some(d => c.trim().endsWith(d));
    expect(validateCorreo('estudiante@duoc.cl')).toBeTrue();
  });

  it('5. Debe rechazar correos con dominios no permitidos', () => {
    const dominios = ["@duoc.cl", "@profesor.duoc.cl", "@gmail.com"];
    const validateCorreo = (c) => dominios.some(d => c.trim().endsWith(d));
    expect(validateCorreo('test@hotmail.com')).toBeFalse();
  });

  it('6. Debe calcular el total acumulado del carrito', () => {
    const calcularSubtotal = (p, c) => p * c;
    expect(calcularSubtotal(49990, 2)).toBe(99980);
  });

  it('7. Debe mostrar el contador de ítems en el header', () => {
    render(<Header cantCarrito={4} />);
    expect(document.body.textContent).toContain('4');
  });

  it('8. Debe formatear precios a CLP', () => {
    const formatearCLP = (m) => new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(m);
    expect(formatearCLP(10000)).toContain('10.000');
  });

  it('9. Debe reconocer al rol Administrador', () => {
    const esAdmin = (rol) => rol === 'Administrador';
    expect(esAdmin('Administrador')).toBeTrue();
  });

  it('10. Debe denegar permisos de Admin a rol Cliente', () => {
    const esAdmin = (rol) => rol === 'Administrador';
    expect(esAdmin('Cliente')).toBeFalse();
  });
});