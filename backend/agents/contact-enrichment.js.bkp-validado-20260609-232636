function enrichContactFromMessage(contact = {}, message = "") {
  const updates = {};

  const text = String(message || "").trim();

  const companyPatterns = [
    /da\s+([A-ZÀ-Ú][A-Za-zÀ-ú0-9&.-]*(?:\s+[A-ZÀ-Ú][A-Za-zÀ-ú0-9&.-]*)*)/g,
    /empresa\s+([A-ZÀ-Ú][A-Za-zÀ-ú0-9&.-]*(?:\s+[A-ZÀ-Ú][A-Za-zÀ-ú0-9&.-]*)*)/g
  ];

  for (const pattern of companyPatterns) {
    const match = pattern.exec(text);

    if (match && !contact.company) {
      updates.company = match[1].trim();
      break;
    }
  }

  const namePatterns = [
    /meu nome é\s+([A-ZÀ-Ú][A-Za-zÀ-ú\s]+)/i,
    /sou o\s+([A-ZÀ-Ú][A-Za-zÀ-ú\s]+)/i,
    /sou a\s+([A-ZÀ-Ú][A-Za-zÀ-ú\s]+)/i,
    /eu sou\s+([A-ZÀ-Ú][A-Za-zÀ-ú\s]+)/i
  ];

  for (const pattern of namePatterns) {
    const match = text.match(pattern);

    if (match && !contact.name) {
      updates.name = match[1].trim();
      break;
    }
  }

  if (
    text.toLowerCase().includes("agente ia") ||
    text.toLowerCase().includes("inteligência artificial") ||
    text.toLowerCase().includes("inteligencia artificial") ||
    text.toLowerCase().includes("whatsapp")
  ) {
    updates.last_interest = "Agente IA";
  }

  if (
    text.toLowerCase().includes("proposta") ||
    text.toLowerCase().includes("vamos avançar") ||
    text.toLowerCase().includes("vamos avancar") ||
    text.toLowerCase().includes("quero contratar")
  ) {
    updates.last_temperature = "quente";
  }

  return updates;
}

module.exports = {
  enrichContactFromMessage
};
