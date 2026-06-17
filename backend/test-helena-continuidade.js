// test-helena-continuidade.js
// Manda uma SEGUNDA mensagem do MESMO contato do teste anterior.
// Se a memoria funciona, a Helena continua de onde parou.

const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { orchestrateHelenaMessage } = require("./agents/helena-orchestrator");
const { generateHelenaReply } = require("./agents/helena-brain");

const phone = "5511988887777"; // MESMO numero do teste anterior
const incomingMessage =
  "Somos de medio porte, atendemos uns 30 condominios aqui na regiao.";

(async () => {
  console.log("Enviando uma SEGUNDA mensagem do mesmo contato...\n");
  try {
    const result = await orchestrateHelenaMessage({ phone, incomingMessage });
    if (result.should_reply && result.prompt_for_ai) {
      const aiReply = await generateHelenaReply(result.prompt_for_ai);
      console.log("=== Resposta da Helena (deve lembrar da conversa anterior) ===\n");
      console.log(aiReply);
      console.log("\n=== Teste de continuidade concluido ===");
    } else {
      console.log("Helena nao deve responder agora.");
    }
  } catch (err) {
    console.error("ERRO:", err.message);
    process.exit(1);
  }
})();
