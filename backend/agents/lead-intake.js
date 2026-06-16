const { saveLead, log } = require("./helena-worker");

function processLead(payload) {
  try {
    const lead = saveLead({
      name: payload.name,
      phone: payload.phone,
      company: payload.company,
      city: payload.city,
      department: payload.department || "comercial",
      interest: payload.interest || "",
      problem_summary: payload.problem_summary || "",
      urgency: payload.urgency || "media",
      lead_temperature: payload.lead_temperature || "morno",
      next_action: payload.next_action || "aguardando_humano",
      assigned_to: payload.assigned_to || "Silvana Camargo",
      status: "new",
      conversation_summary: payload.conversation_summary || "",
      handoff_summary: payload.handoff_summary || ""
    });

    log(`Lead processado: ${lead.name} | ${lead.company}`);
    return lead;
  } catch (err) {
    log(`Erro ao processar lead: ${err.message}`);
    throw err;
  }
}

module.exports = {
  processLead
};
