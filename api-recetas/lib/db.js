import fs from 'fs';
import path from 'path';

const carpeta = path.join(process.cwd(), 'data');
const archivo = path.join(carpeta, 'db.json');
const semilla = path.join(carpeta, 'semilla.json');

export function leer() {
  if (!fs.existsSync(archivo)) {
    fs.copyFileSync(semilla, archivo);
  }
  return JSON.parse(fs.readFileSync(archivo, 'utf-8'));
}

export function guardar(db) {
  fs.writeFileSync(archivo, JSON.stringify(db, null, 2) + '\n', 'utf-8');
}

export function siguienteId(lista) {
  return lista.reduce((max, item) => Math.max(max, item.id), 0) + 1;
}

export function sinContrasena(usuario) {
  const { contrasena, ...resto } = usuario;
  return resto;
}

export function resolverReceta(db, receta) {
  const { creadorId, ...resto } = receta;
  const creador = db.usuarios.find((u) => u.id === creadorId);
  return {
    ...resto,
    creador: creador ? sinContrasena(creador) : null,
  };
}
