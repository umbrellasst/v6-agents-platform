const supabase = require("../supabase");

async function updateContactMemory({
  contact_id,
  last_interest,
  last_summary,
  last_temperature
}) {
  if (!contact_id) {
    throw new Error("contact_id obrigatório");
  }

  const payload = {
    updated_at: new Date().toISOString()
  };

  if (last_interest) {
    payload.last_interest = last_interest;
  }

  if (last_summary) {
    payload.last_summary = last_summary;
  }

  if (last_temperature) {
    payload.last_temperature = last_temperature;
  }

  payload.last_interaction_at = new Date().toISOString();

  const { data, error } = await supabase
    .from("contacts")
    .update(payload)
    .eq("id", contact_id)
    .select()
    .single();

  if (error) {
    console.error("Erro ao atualizar memória:", error.message);
    throw error;
  }

  return data;
}

async function touchContact(contact_id) {
  if (!contact_id) return;

  const { error } = await supabase
    .from("contacts")
    .update({
      last_interaction_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq("id", contact_id);

  if (error) {
    console.error("Erro ao atualizar interação:", error.message);
  }
}

module.exports = {
  updateContactMemory,
  touchContact
};
