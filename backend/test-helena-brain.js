// test-helena-brain.js
// Teste ISOLADO: prova que a plataforma consegue chamar o Claude.
// Rodar com:  node backend/test-helena-brain.js

require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env")
});

const { generateHelenaReply } = require("./agents/helena-brain");

const promptDeTeste = `
Você é Helena, consultora comercial e de atendimento da V6 Tecnologia.
Um cliente chamado João, da empresa "Condomínio Center", mandou esta mensagem no WhatsApp:

"Oi, queria entender como funciona o atendimento automático de vocês para a minha administradora."

Responda de forma cordial, objetiva e em português do Brasil, como você responderia no WhatsApp.
`;

(async () => {
  console.log("Enviando uma pergunta de teste para o Claude...\n");
  try {
    const resposta = await generateHelenaReply(promptDeTeste);
    console.log("=== Resposta da Helena (gerada pelo Claude) ===\n");
    console.log(resposta);
    console.log("\n=== Teste concluído com sucesso ===");
  } catch (err) {
    console.error("ERRO no teste:", err.message);
    process.exit(1);
  }
})();
