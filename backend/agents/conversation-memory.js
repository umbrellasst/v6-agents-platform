const supabase = require("../supabase");

async function saveConversationMessage({
  contact_id,
  customer_id,
  agent_key = "helena",
  direction,
  message
}) {
  const { data, error } = await supabase
    .from("conversation_history")
    .insert({
      contact_id,
      customer_id,
      agent_key,
      direction,
      message
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao salvar histórico:", error.message);
    throw error;
  }

  return data;
}

async function getConversationHistory(contact_id, limit = 10) {
  if (!contact_id) return [];

  const { data, error } = await supabase
    .from("conversation_history")
    .select("*")
    .eq("contact_id", contact_id)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Erro ao buscar histórico:", error.message);
    return [];
  }

  return data || [];
}

module.exports = {
  saveConversationMessage,
  getConversationHistory
};
