const { findContactByPhone } = require("./agents/contact-memory");
const {
  saveConversationMessage,
  getConversationHistory
} = require("./agents/conversation-memory");

async function run() {
  const contact = await findContactByPhone("+5571999999999");

  if (!contact) {
    console.log("contato_nao_encontrado");
    return;
  }

  await saveConversationMessage({
    contact_id: contact.id,
    customer_id: contact.customer_id,
    agent_key: "helena",
    direction: "inbound",
    message: "Olá, tenho interesse em agente comercial para WhatsApp."
  });

  await saveConversationMessage({
    contact_id: contact.id,
    customer_id: contact.customer_id,
    agent_key: "helena",
    direction: "outbound",
    message: "Perfeito, Victor. Vi que você já demonstrou interesse em agentes inteligentes para atendimento."
  });

  const history = await getConversationHistory(contact.id, 5);

  console.log(
    history.map((item) => ({
      direction: item.direction,
      message: item.message
    }))
  );
}

run();
