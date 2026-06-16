function classifyIntent(message = "") {
  const text = message.toLowerCase();

  if (
    text.includes("impressora") ||
    text.includes("internet") ||
    text.includes("servidor") ||
    text.includes("vpn") ||
    text.includes("backup") ||
    text.includes("erro") ||
    text.includes("não funciona") ||
    text.includes("nao funciona") ||
    text.includes("suporte") ||
    text.includes("e-mail") ||
    text.includes("email")
  ) {
    return "support";
  }

  if (
    text.includes("boleto") ||
    text.includes("segunda via") ||
    text.includes("nota fiscal") ||
    text.includes("pagamento") ||
    text.includes("financeiro")
  ) {
    return "financial";
  }

  if (
    text.includes("parceria") ||
    text.includes("parceiro")
  ) {
    return "partnership";
  }

  if (
    text.includes("fornecedor") ||
    text.includes("proposta") ||
    text.includes("material promocional") ||
    text.includes("folder")
  ) {
    return "supplier";
  }

  if (
    text.includes("vaga") ||
    text.includes("currículo") ||
    text.includes("curriculo")
  ) {
    return "hr";
  }

  if (
    text.includes("agendar") ||
    text.includes("agendamento") ||
    text.includes("marcar horário") ||
    text.includes("marcar horario")
  ) {
    return "scheduling";
  }

  if (
    text.includes("orçamento") ||
    text.includes("orcamento") ||
    text.includes("proposta comercial") ||
    text.includes("agente ia") ||
    text.includes("whatsapp")
  ) {
    return "commercial";
  }

  return "general";
}

module.exports = {
  classifyIntent
};
