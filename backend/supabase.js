// Carrega o .env a partir da raiz do projeto, independente de onde o
// processo for iniciado (raiz ou /backend).
require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env")
});

const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Credenciais ausentes: defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no arquivo .env (raiz do projeto)."
  );
}

// service_role ignora o RLS — uso exclusivo de backend, nunca no frontend.
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

module.exports = supabase;
