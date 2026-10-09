import { manejar, opciones, falla } from '@/lib/http';

export const OPTIONS = opciones;
const noExiste = manejar(async (request) => {
  const { pathname } = new URL(request.url);
  falla(404, `No existe el endpoint ${request.method} ${pathname}`);
});

export const GET = noExiste;
export const POST = noExiste;
export const PUT = noExiste;
export const PATCH = noExiste;
export const DELETE = noExiste;
