// test-helena-real.js
// Testa o FLUXO REAL: contexto + histórico + classificação (orquestrador)
// e depois gera a resposta com o Claude. Usa o banco de testes. Não toca produção.

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { orchestrateHelenaMessage } = require("./agents/helena-orchestrator");
const { generateHelenaReply } = require("./agents/helena-brain");

const phone = "5511988887777";
const incomingMessage =
  "Oi, queria saber como funciona o atendimento automatico de voces para a minha administradora de condominios.";

(async () => {
  console.log("Rodando o fluxo real da plataforma...\n");
  try {
    const result = await orchestrateHelenaMessage({ phone, incomingMessage });

    console.log("Decisao da plataforma:");
    console.log("  - deve responder:", result.should_reply);
    console.log("  - relacionamento:", result.relationship_type);
    console.log("  - intencao:", result.intent_type);
    console.log("  - rota:", JSON.stringify(result.route));
    console.log("");

    if (result.should_reply && result.prompt_for_ai) {
      const aiReply = await generateHelenaReply(result.prompt_for_ai);
      console.log("=== Resposta da Helena (contexto real + Claude) ===\n");
      console.log(aiReply);
      console.log("\n=== Fluxo real concluido com sucesso ===");
    } else {
      console.log("Helena nao deve responder agora (atendimento humano ou sem prompt).");
    }
  } catch (err) {
    console.error("ERRO no fluxo real:", err.message);
    console.error(err);
    process.exit(1);
  }
})();
