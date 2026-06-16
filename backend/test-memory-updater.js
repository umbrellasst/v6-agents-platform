const { findContactByPhone } = require("./agents/contact-memory");
const { updateContactMemory } = require("./agents/memory-updater");

async function run() {
  const contact = await findContactByPhone("+5571999999999");

  if (!contact) {
    console.log("contato_nao_encontrado");
    return;
  }

  const updated = await updateContactMemory({
    contact_id: contact.id,
    last_interest: "Implantação de SDR WhatsApp",
    last_summary:
      "Cliente está estruturando a V6 Agents e deseja uma SDR inteligente com memória, ownership e contexto.",
    last_temperature: "quente"
  });

  console.log({
    name: updated.name,
    company: updated.company,
    last_interest: updated.last_interest,
    last_summary: updated.last_summary,
    last_temperature: updated.last_temperature
  });
}

run();
