const { findContactByPhone } = require("./agents/contact-memory");

async function run() {
  const phone = "+5571999999999";

  const contact = await findContactByPhone(phone);

  if (!contact) {
    console.log("contato_nao_encontrado");
    return;
  }

  console.log({
    name: contact.name,
    phone: contact.phone,
    company: contact.company,
    city: contact.city,
    last_interest: contact.last_interest,
    last_temperature: contact.last_temperature
  });
}

run();
