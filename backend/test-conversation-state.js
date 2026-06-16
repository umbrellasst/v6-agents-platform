const { findContactByPhone } = require("./agents/contact-memory");

const {
  ensureConversationState,
  getConversationState,
  setOwnerHuman,
  setOwnerHelena,
  canHelenaReply
} = require("./agents/conversation-state");

async function run() {
  const contact = await findContactByPhone("+5571999999999");

  if (!contact) {
    console.log("contato_nao_encontrado");
    return;
  }

  await ensureConversationState({
    contact_id: contact.id,
    customer_id: contact.customer_id
  });

  let state = await getConversationState(contact.id);

  console.log("\n=== ESTADO INICIAL ===");
  console.log({
    owner: state.owner,
    status: state.status,
    canHelenaReply: canHelenaReply(state)
  });

  await setOwnerHuman({
    contact_id: contact.id,
    assigned_department: "comercial"
  });

  state = await getConversationState(contact.id);

  console.log("\n=== APÓS HANDOFF ===");
  console.log({
    owner: state.owner,
    status: state.status,
    department: state.assigned_department,
    canHelenaReply: canHelenaReply(state)
  });

  await setOwnerHelena({
    contact_id: contact.id
  });

  state = await getConversationState(contact.id);

  console.log("\n=== DEVOLVIDO PARA HELENA ===");
  console.log({
    owner: state.owner,
    status: state.status,
    canHelenaReply: canHelenaReply(state)
  });
}

run();
