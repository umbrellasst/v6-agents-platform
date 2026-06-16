const { findContactByPhone } = require("./agents/contact-memory");
const { setOwnerHuman, setOwnerHelena } = require("./agents/conversation-state");
const { orchestrateHelenaMessage } = require("./agents/helena-orchestrator");

async function run() {
  const phone = "+5571999999999";
  const contact = await findContactByPhone(phone);

  if (!contact) {
    console.log("contato_nao_encontrado");
    return;
  }

  await setOwnerHelena({ contact_id: contact.id });

  let result = await orchestrateHelenaMessage({
    phone,
    incomingMessage: "Oi Helena, queria retomar aquela conversa sobre agente comercial."
  });

  console.log("\n=== HELENA PODE RESPONDER ===");
  console.log({
    should_reply: result.should_reply,
    reason: result.reason,
    known_contact: result.known_contact,
    owner: result.owner,
    status: result.status
  });

  console.log("\n=== PROMPT GERADO ===");
  console.log(result.prompt_for_ai);

  await setOwnerHuman({
    contact_id: contact.id,
    assigned_department: "comercial"
  });

  result = await orchestrateHelenaMessage({
    phone,
    incomingMessage: "Tenho mais uma dúvida sobre a proposta."
  });

  console.log("\n=== HUMANO ASSUMIU ===");
  console.log({
    should_reply: result.should_reply,
    reason: result.reason,
    owner: result.owner,
    status: result.status,
    assigned_department: result.assigned_department
  });
}

run();
