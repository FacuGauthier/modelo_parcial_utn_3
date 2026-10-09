import { leer, sinContrasena } from '@/lib/db';
import { manejar, opciones, leerCuerpo, falla, texto } from '@/lib/http';

export const OPTIONS = opciones;

export const POST = manejar(async (request) => {
  const cuerpo = await leerCuerpo(request);
  const username = texto(cuerpo.username);
  const contrasena = typeof cuerpo.contrasena === 'string' ? cuerpo.contrasena : '';
  if (!username || !contrasena) falla(400, 'El nombre de usuario y la contraseña son obligatorios');

  const usuario = leer().usuarios.find(
    (u) => u.username.toLowerCase() === username.toLowerCase() && u.contrasena === contrasena
  );
  if (!usuario) falla(401, 'Usuario o contraseña incorrectos');
  return { cuerpo: sinContrasena(usuario) };
});
