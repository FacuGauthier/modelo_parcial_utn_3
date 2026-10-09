import { leer, guardar, siguienteId, sinContrasena } from '@/lib/db';
import { manejar, opciones, leerCuerpo, falla, texto, FORMATO_MAIL } from '@/lib/http';

export const OPTIONS = opciones;

export const POST = manejar(async (request) => {
  const cuerpo = await leerCuerpo(request);
  const username = texto(cuerpo.username);
  const mail = texto(cuerpo.mail).toLowerCase();
  const contrasena = typeof cuerpo.contrasena === 'string' ? cuerpo.contrasena : '';

  if (!username) falla(400, 'El nombre de usuario es obligatorio');
  if (!mail) falla(400, 'El mail es obligatorio');
  if (!FORMATO_MAIL.test(mail)) falla(400, 'El mail no tiene un formato válido');
  if (!contrasena) falla(400, 'La contraseña es obligatoria');
  if (contrasena.length <= 8) falla(400, 'La contraseña tiene que tener más de 8 caracteres');

  const db = leer();
  if (db.usuarios.some((u) => u.username.toLowerCase() === username.toLowerCase())) {
    falla(409, 'Ya existe un usuario con ese nombre');
  }
  if (db.usuarios.some((u) => u.mail === mail)) falla(409, 'Ya existe un usuario con ese mail');

  const usuario = { id: siguienteId(db.usuarios), username, mail, contrasena };
  db.usuarios.push(usuario);
  guardar(db);
  return { status: 201, cuerpo: sinContrasena(usuario) };
});
