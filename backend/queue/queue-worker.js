const fs = require("fs");
const path = require("path");

const BASE_DIR = path.resolve(process.env.HOME, "v6-agents-platform");
const QUEUE_FILE = path.join(BASE_DIR, "backend", "queue", "messages.jsonl");
const LOG_FILE = path.join(BASE_DIR, "backend", "logs", "helena.log");

function log(message) {
  fs.appendFileSync(LOG_FILE, `[${new Date().toISOString()}] ${message}\n`);
}

function enqueueMessage(message) {
  const now = new Date().toISOString();

  const payload = {
    message_id: message.message_id || `msg_${Date.now()}`,
    created_at: now,
    scheduled_at: message.scheduled_at || now,
    channel: message.channel || "whatsapp",
    to: message.to || "",
    type: message.type || "text",
    body: message.body || "",
    status: "pending",
    agent: message.agent || "helena",
    reason: message.reason || ""
  };

  fs.appendFileSync(QUEUE_FILE, JSON.stringify(payload) + "\n");
  log(`Mensagem enfileirada: ${payload.message_id} -> ${payload.to}`);
  return payload;
}

module.exports = {
  enqueueMessage
};
