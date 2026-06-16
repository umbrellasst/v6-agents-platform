const { log } = require("./helena-worker");

const DEFAULT_ASSIGNMENTS = {
  comercial: "Setor Comercial",
  financeiro: "Setor Financeiro",
  suporte: "Suporte Técnico",
  curriculos: "RH / Vagas"
};

function dispatchLead(lead) {
  const department = (lead.department || "comercial").toLowerCase();
  const assignedTo = lead.assigned_to || DEFAULT_ASSIGNMENTS[department] || "Equipe V6";

  const payload = {
    lead_id: lead.lead_id,
    assigned_to: assignedTo,
    department,
    priority: lead.lead_temperature === "quente" ? "alta" : "normal",
    message: buildHandoffMessage({ ...lead, assigned_to: assignedTo })
  };

  log(`Dispatch: ${payload.lead_id} -> ${payload.assigned_to} (${payload.priority})`);
  return payload;
}

function buildHandoffMessage(lead) {
  return [
    "📌 *Novo atendimento V6 Agents*",
    "",
    `👤 *Nome:* ${lead.name || "Não informado"}`,
    `🏢 *Empresa:* ${lead.company || "Não informada"}`,
    `📍 *Cidade:* ${lead.city || "Não informada"}`,
    `📞 *Telefone:* ${lead.phone || "Não informado"}`,
    "",
    `🏷️ *Setor:* ${lead.department || "Não classificado"}`,
    `👥 *Responsável:* ${lead.assigned_to || "Setor responsável"}`,
    `🔥 *Temperatura:* ${lead.lead_temperature || "Não classificada"}`,
    `⚡ *Urgência:* ${lead.urgency || "Não informada"}`,
    "",
    `🎯 *Interesse:* ${lead.interest || "Não informado"}`,
    `📝 *Resumo:* ${lead.problem_summary || "Não informado"}`,
    "",
    `➡️ *Próxima ação:* ${lead.next_action || "Atendimento humano"}`
  ].join("\n");
}

module.exports = {
  dispatchLead,
  buildHandoffMessage
};
