const fs = require("fs");
const path = require("path");

const BASE_DIR = path.resolve(process.env.HOME, "v6-agents-platform");
const LEADS_FILE = path.join(BASE_DIR, "backend", "leads", "leads.jsonl");
const LOG_FILE = path.join(BASE_DIR, "backend", "logs", "helena.log");

function log(message) {
  fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ${message}\n`);
}

function loadLeads() {
  if (!fs.existsSync(LEADS_FILE)) return [];

  return fs
    .readFileSync(LEADS_FILE, "utf8")
    .split("\n")
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function getPendingFollowups() {
  const now = new Date();

  return loadLeads().filter((lead) => {
    if (!["morno", "quente"].includes((lead.lead_temperature || "").toLowerCase())) return false;
    if (["closed", "won", "lost"].includes((lead.status || "").toLowerCase())) return false;
    if (!lead.followup_due_at) return false;

    return new Date(lead.followup_due_at) <= now;
  });
}

function buildFollowupMessage(lead) {
  const name = lead.name ? `, *${lead.name}*` : "";

  return [
    `Olá${name}! 😊`,
    "",
    `Passando para saber se você conseguiu avançar com a demanda sobre *${lead.interest || "sua solicitação"}*.`,
    "",
    "Fico à disposição para seguir te ajudando por aqui."
  ].join("\n");
}

module.exports = {
  loadLeads,
  getPendingFollowups,
  buildFollowupMessage
};
