// helena-brain.js
// Ponte entre a plataforma e a IA: recebe um "pedido" (prompt) com o contexto
// e o histórico, entrega ao Claude e devolve o texto da resposta.

const Anthropic = require("@anthropic-ai/sdk");

const MODEL = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-6";

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

async function generateHelenaReply(prompt) {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error(
      "ANTHROPIC_API_KEY ausente. Defina a chave da API do Claude no arquivo .env."
    );
  }

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 1024,
    messages: [{ role: "user", content: prompt }]
  });

  const text = response.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();

  return text;
}

module.exports = { generateHelenaReply };
