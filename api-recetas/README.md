# API de recetas — Laboratorio IV

API para practicar Angular con un recetario personal. Los datos se guardan en `data/db.json`.

## Requisitos y puesta en marcha

Necesitás Node.js 20.9 o superior.

```bash
npm install
npm run dev
```

La API queda disponible en `http://localhost:3000`. Abrí esa dirección para ver los endpoints disponibles.

Para restaurar los datos de prueba:

```bash
npm run reiniciar
```

## Usuarios de prueba

| Usuario | Contraseña | Recetas iniciales |
|---|---|---:|
| ana | ana123456 | 5 |
| bruno | bruno1234 | 3 |
| carla | carla1234 | 2 |
| diego | diego1234 | 1 |

Las contraseñas en texto plano se usan solamente para este ejercicio.

## Endpoints

Todas las direcciones empiezan con `http://localhost:3000`.

| Método | Ruta | Cuerpo | Qué hace |
|---|---|---|---|
| POST | `/api/usuarios/registro` | `{ "username": "...", "mail": "...", "contrasena": "..." }` | Registra un usuario y devuelve sus datos sin contraseña |
| POST | `/api/usuarios/login` | `{ "username": "...", "contrasena": "..." }` | Inicia sesión y devuelve el usuario sin contraseña |
| GET | `/api/recetas?usuarioId=1` | — | Lista las recetas de ese usuario |
| POST | `/api/recetas?usuarioId=1` | `{ "titulo": "...", "descripcion": "...", "categoria": "...", "tiempoPreparacion": 25, "dificultad": "facil" }` | Crea una receta para ese usuario |
| GET | `/api/recetas/1?usuarioId=1` | — | Devuelve el detalle de una receta propia |
| PATCH | `/api/recetas/1?usuarioId=1` | `{ "favorita": true }` | Marca o desmarca una receta como favorita |
| DELETE | `/api/recetas/1?usuarioId=1` | — | Elimina una receta propia |

Todos los endpoints de recetas requieren `usuarioId` como parámetro de consulta. Cada usuario puede ver, marcar como favorita y eliminar únicamente sus recetas. Una receta nueva comienza con `favorita: false`.

## Estructura de una receta

```json
{
  "id": 1,
  "titulo": "Brownies de chocolate",
  "descripcion": "Mezclar chocolate derretido con manteca, huevos, azúcar y harina.",
  "categoria": "Postres",
  "tiempoPreparacion": 40,
  "dificultad": "facil",
  "favorita": true,
  "creador": {
    "id": 1,
    "username": "ana",
    "mail": "ana@mail.com"
  }
}
```

`dificultad` admite `facil`, `media` o `dificil`. El tiempo de preparación debe ser un entero mayor que cero.

## Errores

Los errores se devuelven como `{ "error": "mensaje" }`:

- `400`: faltan datos o son inválidos.
- `401`: nombre de usuario o contraseña incorrectos.
- `403`: se intenta acceder a una receta de otro usuario.
- `404`: no existe el recurso solicitado.
- `409`: el nombre de usuario o el mail ya están registrados.

La API no gestiona sesiones reales: Angular envía el `usuarioId` obtenido al iniciar sesión.
