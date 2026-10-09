import { guardar, resolverReceta } from '@/lib/db';
import { manejar, opciones, leerCuerpo, falla, usuarioDelPedido, buscarReceta, recetaPropia } from '@/lib/http';

export const OPTIONS = opciones;

export const GET = manejar(async (request, { params }) => {
  const { id } = await params;
  const { db, usuario } = usuarioDelPedido(request);
  const receta = await buscarReceta(db, id);
  recetaPropia(receta, usuario.id);
  return { cuerpo: resolverReceta(db, receta) };
});

export const PATCH = manejar(async (request, { params }) => {
  const { id } = await params;
  const { db, usuario } = usuarioDelPedido(request);
  const receta = await buscarReceta(db, id);
  recetaPropia(receta, usuario.id);

  const cuerpo = await leerCuerpo(request);
  if (typeof cuerpo.favorita !== 'boolean') falla(400, 'El campo favorita tiene que ser true o false');
  receta.favorita = cuerpo.favorita;
  guardar(db);
  return { cuerpo: resolverReceta(db, receta) };
});

export const DELETE = manejar(async (request, { params }) => {
  const { id } = await params;
  const { db, usuario } = usuarioDelPedido(request);
  const receta = await buscarReceta(db, id);
  recetaPropia(receta, usuario.id);

  db.recetas = db.recetas.filter((r) => r.id !== receta.id);
  guardar(db);
  return { cuerpo: { mensaje: 'Receta eliminada correctamente' } };
});
