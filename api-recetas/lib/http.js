import { NextResponse } from 'next/server';
import { leer, sinContrasena } from './db';

const ORIGEN_LOCAL = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/;

function cabecerasCors(request) {
  const origen = request.headers.get('origin');
  return {
    'Access-Control-Allow-Origin': origen && ORIGEN_LOCAL.test(origen) ? origen : 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    Vary: 'Origin',
  };
}

export class ErrorApi extends Error {
  constructor(status, mensaje) {
    super(mensaje);
    this.status = status;
  }
}

export function falla(status, mensaje) {
  throw new ErrorApi(status, mensaje);
}

export function manejar(handler) {
  return async (request, contexto) => {
    const { pathname, search } = new URL(request.url);
    let status;
    let cuerpo;
    try {
      const resultado = await handler(request, contexto);
      status = resultado.status ?? 200;
      cuerpo = resultado.cuerpo;
    } catch (e) {
      if (e instanceof ErrorApi) {
        status = e.status;
        cuerpo = { error: e.message };
      } else {
        console.error(e);
        status = 500;
        cuerpo = { error: 'Error interno del servidor' };
      }
    }
    if (cuerpo && cuerpo.error) {
      console.log(`  ✗ ${request.method} ${pathname}${search} → ${status}: ${cuerpo.error}`);
    }
    return NextResponse.json(cuerpo, { status, headers: cabecerasCors(request) });
  };
}

export function opciones(request) {
  return new Response(null, { status: 204, headers: cabecerasCors(request) });
}

export async function leerCuerpo(request) {
  try {
    const cuerpo = await request.json();
    if (cuerpo === null || typeof cuerpo !== 'object' || Array.isArray(cuerpo)) throw new Error();
    return cuerpo;
  } catch {
    falla(400, 'El cuerpo de la petición tiene que ser un objeto JSON');
  }
}

export function usuarioDelPedido(request) {
  const valor = new URL(request.url).searchParams.get('usuarioId');
  if (valor === null || valor === '') falla(400, 'Falta el parámetro usuarioId en la URL');
  const db = leer();
  const usuario = db.usuarios.find((u) => String(u.id) === valor);
  if (!usuario) falla(404, `No existe un usuario con id ${valor}`);
  return { db, usuario };
}

export async function buscarReceta(db, id) {
  const receta = db.recetas.find((r) => String(r.id) === id);
  if (!receta) falla(404, `No existe una receta con id ${id}`);
  return receta;
}

export function recetaPropia(receta, usuarioId) {
  if (receta.creadorId !== usuarioId) falla(403, 'Solo podés acceder a tus propias recetas');
}

export function texto(valor) {
  return typeof valor === 'string' ? valor.trim() : '';
}

export const FORMATO_MAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
