const { orchestrateHelenaMessage } = require("./agents/helena-orchestrator");

async function run() {
  const result = await orchestrateHelenaMessage({
    phone: "+5571997133144",
    incomingMessage: "Olá, meu nome é João. Sou da Librapred e tenho interesse em agente IA para WhatsApp."
  });

  console.log(JSON.stringify(result, null, 2));
}

run().catch(console.error);
