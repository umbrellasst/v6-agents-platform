const supabase = require('./supabase');

async function run() {
  const { data, error } = await supabase
    .from('agents')
    .select('*');

  if (error) {
    console.error('ERRO:', error.message);
    return;
  }

  console.log(JSON.stringify(data, null, 2));
}

run();
