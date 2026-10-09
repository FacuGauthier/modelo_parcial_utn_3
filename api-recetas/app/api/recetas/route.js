import { guardar, siguienteId, resolverReceta } from '@/lib/db';
import { manejar, opciones, leerCuerpo, falla, texto, usuarioDelPedido } from '@/lib/http';

export const OPTIONS = opciones;
const DIFICULTADES = ['facil', 'media', 'dificil'];

export const GET = manejar(async (request) => {
  const { db, usuario } = usuarioDelPedido(request);
  const recetas = db.recetas
    .filter((r) => r.creadorId === usuario.id)
    .map((r) => resolverReceta(db, r));
  return { cuerpo: recetas };
});

export const POST = manejar(async (request) => {
  const { db, usuario } = usuarioDelPedido(request);
  const cuerpo = await leerCuerpo(request);
  const titulo = texto(cuerpo.titulo);
  const descripcion = texto(cuerpo.descripcion);
  const categoria = texto(cuerpo.categoria);
  const tiempoPreparacion = Number(cuerpo.tiempoPreparacion);
  const dificultad = texto(cuerpo.dificultad);

  if (!titulo) falla(400, 'El título es obligatorio');
  if (!descripcion) falla(400, 'La descripción es obligatoria');
  if (!categoria) falla(400, 'La categoría es obligatoria');
  if (cuerpo.tiempoPreparacion === undefined || cuerpo.tiempoPreparacion === null || cuerpo.tiempoPreparacion === '') {
    falla(400, 'El tiempo de preparación es obligatorio');
  }
  if (!Number.isInteger(tiempoPreparacion) || tiempoPreparacion <= 0) {
    falla(400, 'El tiempo de preparación tiene que ser un número entero mayor que cero');
  }
  if (!DIFICULTADES.includes(dificultad)) falla(400, 'La dificultad tiene que ser facil, media o dificil');

  const receta = {
    id: siguienteId(db.recetas),
    titulo,
    descripcion,
    categoria,
    tiempoPreparacion,
    dificultad,
    favorita: false,
    creadorId: usuario.id,
  };
  db.recetas.push(receta);
  guardar(db);
  return { status: 201, cuerpo: resolverReceta(db, receta) };
});
