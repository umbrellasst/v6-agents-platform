const fs = require("fs");
const path = require("path");
const supabase = require("../supabase");

const BASE_DIR = path.resolve(process.env.HOME, "v6-agents-platform");
const LOG_FILE = path.join(BASE_DIR, "backend", "logs", "helena.log");

function log(message) {
  const line = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(LOG_FILE, line);
}

async function saveLead(lead) {
  const payload = {
    source: lead.source || "whatsapp",
    agent_key: lead.agent || lead.agent_key || "helena",
    name: lead.name || "",
    phone: lead.phone || "",
    company: lead.company || "",
    city: lead.city || "",
    is_contract_client: Boolean(lead.is_contract_client),
    client_type: lead.client_type || "lead",
    department: lead.department || "",
    interest: lead.interest || "",
    problem_summary: lead.problem_summary || "",
    urgency: lead.urgency || "",
    lead_temperature: lead.lead_temperature || "",
    next_action: lead.next_action || "",
    assigned_to: lead.assigned_to || "",
    status: lead.status || "new",
    last_message_at: lead.last_message_at || new Date().toISOString(),
    followup_due_at: lead.followup_due_at || null,
    conversation_summary: lead.conversation_summary || "",
    handoff_summary: lead.handoff_summary || ""
  };

  const { data, error } = await supabase
    .from("leads")
    .insert(payload)
    .select()
    .single();

  if (error) {
    log(`Erro ao salvar lead no Supabase: ${error.message}`);
    throw error;
  }

  log(`Lead salvo no Supabase: ${data.id} | ${data.name} | ${data.company}`);
  return data;
}

module.exports = {
  saveLead,
  log
};
