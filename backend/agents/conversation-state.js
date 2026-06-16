const supabase = require("../supabase");

async function getConversationState(contact_id) {
  if (!contact_id) return null;

  const { data, error } = await supabase
    .from("conversation_state")
    .select("*")
    .eq("contact_id", contact_id)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar estado da conversa:", error.message);
    return null;
  }

  return data;
}

async function ensureConversationState({ contact_id, customer_id }) {
  let state = await getConversationState(contact_id);

  if (state) return state;

  const { data, error } = await supabase
    .from("conversation_state")
    .insert({
      contact_id,
      customer_id,
      owner: "helena",
      status: "active"
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar estado da conversa:", error.message);
    throw error;
  }

  return data;
}

async function setOwnerHuman({ contact_id, assigned_department }) {
  const { data, error } = await supabase
    .from("conversation_state")
    .update({
      owner: "human",
      status: "handoff",
      assigned_department,
      last_human_message_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq("contact_id", contact_id)
    .select()
    .single();

  if (error) {
    console.error("Erro ao transferir para humano:", error.message);
    throw error;
  }

  return data;
}

async function setOwnerHelena({ contact_id }) {
  const { data, error } = await supabase
    .from("conversation_state")
    .update({
      owner: "helena",
      status: "active",
      updated_at: new Date().toISOString()
    })
    .eq("contact_id", contact_id)
    .select()
    .single();

  if (error) {
    console.error("Erro ao devolver para Helena:", error.message);
    throw error;
  }

  return data;
}

function canHelenaReply(state) {
  if (!state) return true;
  return state.owner === "helena";
}

module.exports = {
  getConversationState,
  ensureConversationState,
  setOwnerHuman,
  setOwnerHelena,
  canHelenaReply
};
