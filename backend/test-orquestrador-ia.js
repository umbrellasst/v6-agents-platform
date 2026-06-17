const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { orchestrateHelenaMessage } = require("./agents/helena-orchestrator");

const phone = "5511977776666";
const incomingMessage =
  "Oi, quero um agente de IA no WhatsApp para minha imobiliaria, para agendar visitas.";

(async () => {
  try {
    const result = await orchestrateHelenaMessage({ phone, incomingMessage });
    console.log("fonte da resposta:", result.reply_source, "(esperado: claude)");
    console.log("\n=== Resposta da Helena (direto do orquestrador) ===\n");
    console.log(result.reply);
    console.log("\n=== OK ===");
  } catch (err) {
    console.error("ERRO:", err.message);
    process.exit(1);
  }
})();
