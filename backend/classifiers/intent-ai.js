// intent-ai.js
// Classifica a intencao da mensagem usando o Claude.
// Retorna uma das categorias validas, ou null (para cair na regra antiga).

const Anthropic = require("@anthropic-ai/sdk");

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";
const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const CATEGORIAS = [
  "commercial", "support", "financial", "supplier",
  "partnership", "scheduling", "hr", "general"
];

async function classifyIntentAI(message) {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  try {
    const resp = await client.messages.create({
      model: MODEL,
      max_tokens: 16,
      system:
        "Voce classifica a intencao de mensagens de WhatsApp recebidas por uma empresa de tecnologia. " +
        "Responda APENAS com uma destas palavras, sem pontuacao e sem explicacao: " +
        "commercial, support, financial, supplier, partnership, scheduling, hr, general.",
      messages: [{ role: "user", content: message }]
    });

    const raw = resp.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join(" ")
      .trim()
      .toLowerCase();

    return CATEGORIAS.find((c) => raw.includes(c)) || null;
  } catch (err) {
    console.error("classifyIntentAI falhou:", err.message);
    return null;
  }
}

module.exports = { classifyIntentAI, CATEGORIAS };
