const { findContactByPhone } = require("./contact-memory");
const { getConversationHistory } = require("./conversation-memory");

async function buildHelenaContext({ phone, incomingMessage }) {
  const contact = await findContactByPhone(phone);

  if (!contact) {
    return {
      known_contact: false,
      phone,
      incoming_message: incomingMessage,
      context_text: [
        "Contato ainda não encontrado na base.",
        "A Helena deve fazer a abertura completa, coletando nome, empresa e necessidade."
      ].join("\n")
    };
  }

  const history = await getConversationHistory(contact.id, 5);

  const historyText = history
    .slice()
    .reverse()
    .map((item) => {
      const label = item.direction === "inbound" ? "Cliente" : "Helena";
      return `${label}: ${item.message}`;
    })
    .join("\n");

  const contextText = [
    "Contato reconhecido na base da V6 Agents.",
    "",
    `Nome: ${contact.name || "não informado"}`,
    `Telefone: ${contact.phone || phone}`,
    `Empresa: ${contact.company || "não informada"}`,
    `Cidade: ${contact.city || "não informada"}`,
    `Tipo de contato: ${contact.contact_type || "lead"}`,
    `Cliente contrato: ${contact.is_contract_client ? "sim" : "não"}`,
    `Último interesse: ${contact.last_interest || "não informado"}`,
    `Temperatura anterior: ${contact.last_temperature || "não classificada"}`,
    "",
    "Histórico recente:",
    historyText || "Sem histórico recente.",
    "",
    `Nova mensagem recebida: ${incomingMessage}`,
    "",
    "Instrução para Helena:",
    "- Não pergunte novamente nome, empresa ou cidade se já estiverem disponíveis.",
    "- Use o histórico para responder com contexto.",
    "- Seja cordial, consultiva e objetiva.",
    "- Se houver nova demanda, aprofunde apenas o que ainda não estiver claro.",
    "- Se for cliente contrato, priorize fluxo de chamado quando a demanda for suporte."
  ].join("\n");

  return {
    known_contact: true,
    contact,
    history,
    phone,
    incoming_message: incomingMessage,
    context_text: contextText
  };
}

module.exports = {
  buildHelenaContext
};
