const fs = require('fs');
const path = require('path');

const carpeta = path.join(__dirname, '..', 'data');
fs.copyFileSync(path.join(carpeta, 'semilla.json'), path.join(carpeta, 'db.json'));
console.log('Datos reiniciados: data/db.json volvió a su estado original.');
