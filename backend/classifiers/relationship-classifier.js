function classifyRelationship({ contact = {}, message = "" }) {
  const text = `${message} ${contact.company || ""} ${contact.last_summary || ""}`.toLowerCase();

  if (contact.relationship_type) {
    return contact.relationship_type;
  }

  if (contact.is_contract_client === true) {
    return "client_contract";
  }

  if (
    text.includes("fornecedor") ||
    text.includes("material") ||
    text.includes("folder") ||
    text.includes("proposta de fornecimento") ||
    text.includes("apresentar nossa solução") ||
    text.includes("apresentar nossos serviços")
  ) {
    return "supplier";
  }

  if (
    text.includes("parceria") ||
    text.includes("parceiro") ||
    text.includes("indicação") ||
    text.includes("revenda")
  ) {
    return "partner";
  }

  if (
    text.includes("vaga") ||
    text.includes("currículo") ||
    text.includes("curriculo") ||
    text.includes("trabalhar com vocês") ||
    text.includes("oportunidade de emprego")
  ) {
    return "candidate";
  }

  if (
    text.includes("segunda via") ||
    text.includes("boleto") ||
    text.includes("nota fiscal") ||
    text.includes("pagamento") ||
    text.includes("mensalidade")
  ) {
    return "client_one_time";
  }

  return "lead";
}

module.exports = {
  classifyRelationship
};
