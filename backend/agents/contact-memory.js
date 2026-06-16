const supabase = require("../supabase");
const { enrichContactFromMessage } = require("./contact-enrichment");

function normalizePhone(phone) {
  if (!phone) return "";
  return String(phone).replace(/\D/g, "");
}

async function findContactByPhone(phone) {
  if (!phone) return null;

  const normalized = normalizePhone(phone);

  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .limit(500);

  if (error) {
    console.error("Erro ao buscar contato:", error.message);
    return null;
  }

  const contact = (data || []).find((c) => {
    const contactPhone = normalizePhone(c.phone);
    return contactPhone === normalized;
  });

  return contact || null;
}

async function updateContactMemory(contactId, message) {
  const { data: contact } = await supabase
    .from("contacts")
    .select("*")
    .eq("id", contactId)
    .single();

  if (!contact) return;

  const updates = enrichContactFromMessage(contact, message);

  if (Object.keys(updates).length === 0) {
    return;
  }

  updates.updated_at = new Date().toISOString();

  const { error } = await supabase
    .from("contacts")
    .update(updates)
    .eq("id", contactId);

  if (error) {
    console.error("Erro ao atualizar memória:", error.message);
  }
}

async function findOrCreateContactByPhone({
  phone,
  customer_id = null,
  name = null,
  company = null,
  city = null
}) {
  const existing = await findContactByPhone(phone);

  if (existing) {
    return {
      contact: existing,
      created: false
    };
  }

  const { data, error } = await supabase
    .from("contacts")
    .insert({
      customer_id,
      name,
      phone,
      company,
      city,
      contact_type: "lead",
      is_contract_client: false,
      last_interaction_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar contato:", error.message);
    throw error;
  }

  return {
    contact: data,
    created: true
  };
}

module.exports = {
  normalizePhone,
  findContactByPhone,
  findOrCreateContactByPhone,
  updateContactMemory
};
