const fs = require('fs');

// Carga .env manualmente para desarrollo local (sin dependencias externas)
if (fs.existsSync('.env')) {
  fs.readFileSync('.env', 'utf-8').split('\n').forEach(line => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) return;
    const eq = trimmed.indexOf('=');
    if (eq === -1) return;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    if (key && !(key in process.env)) process.env[key] = val;
  });
}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

if (!url || !key) {
  console.error('ERROR: Faltan SUPABASE_URL o SUPABASE_ANON_KEY.');
  console.error('Crea un archivo .env con esas variables o expórtalas en tu shell.');
  process.exit(1);
}

fs.writeFileSync(
  'config.js',
  `const SUPABASE_URL = '${url}';\nconst SUPABASE_ANON_KEY = '${key}';\n`
);

console.log('config.js generado correctamente.');
