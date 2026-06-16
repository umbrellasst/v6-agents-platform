const { buildHelenaContext } = require("./agents/helena-context-builder");

async function run() {
  const context = await buildHelenaContext({
    phone: "+5571999999999",
    incomingMessage: "Oi Helena, queria retomar aquela conversa sobre agente comercial."
  });

  console.log(context.context_text);
}

run();
