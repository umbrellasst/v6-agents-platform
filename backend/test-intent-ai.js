const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const { orchestrateHelenaMessage } = require("./agents/helena-orchestrator");

const casos = [
  "Oi, quero contratar um agente de IA no WhatsApp para minha empresa.",
  "Meu sistema parou de funcionar agora, preciso de suporte urgente!",
  "Gostaria de negociar o pagamento da minha fatura desse mes."
];

(async () => {
  let i = 0;
  for (const msg of casos) {
    i++;
    const phone = "551190000" + (1000 + i);
    const r = await orchestrateHelenaMessage({ phone, incomingMessage: msg });
    console.log("Mensagem:", msg);
    console.log("  -> intencao:", r.intent_type, "| rota:", r.route.messageType);
    console.log("");
  }
  console.log("=== Teste de intencao concluido ===");
})();
