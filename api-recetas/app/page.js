import { leer } from '@/lib/db';

export const dynamic = 'force-dynamic';

const endpoints = [
  ['POST', '/api/usuarios/registro', 'Registra un usuario'],
  ['POST', '/api/usuarios/login', 'Inicia sesión'],
  ['GET', '/api/recetas?usuarioId=1', 'Lista las recetas de un usuario'],
  ['POST', '/api/recetas?usuarioId=1', 'Crea una receta'],
  ['GET', '/api/recetas/1?usuarioId=1', 'Consulta el detalle de una receta propia'],
  ['PATCH', '/api/recetas/1?usuarioId=1', 'Marca o desmarca una receta como favorita'],
  ['DELETE', '/api/recetas/1?usuarioId=1', 'Elimina una receta propia'],
];
const celda = { borderBottom: '1px solid #ddd', padding: '8px 10px', textAlign: 'left' };

export default function Inicio() {
  const db = leer();
  return (
    <main style={{ maxWidth: 1000, margin: '36px auto', padding: '0 24px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#8a3d2d' }}>La API de recetas está funcionando</h1>
      <p>Hay {db.usuarios.length} usuarios y {db.recetas.length} recetas cargadas.</p>
      <p>Probá en el navegador: <a href="/api/recetas?usuarioId=1">/api/recetas?usuarioId=1</a></p>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead><tr><th style={celda}>Método</th><th style={celda}>Ruta</th><th style={celda}>Qué hace</th></tr></thead>
        <tbody>{endpoints.map(([metodo, ruta, descripcion]) => (
          <tr key={metodo + ruta}><td style={celda}><b>{metodo}</b></td><td style={celda}><code>{ruta}</code></td><td style={celda}>{descripcion}</td></tr>
        ))}</tbody>
      </table>
      <p style={{ color: '#666', marginTop: 24 }}>Para restaurar los datos originales: <code>npm run reiniciar</code></p>
    </main>
  );
}
