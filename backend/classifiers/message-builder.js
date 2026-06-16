const SUPPORT_PORTAL_URL = "https://suporte.v6tecnologia.com.br/";

function buildHelenaMessage({ route, contact = {} }) {
  const name = contact.name || null;
  const interest = contact.last_interest || null;
  const temperature = contact.last_temperature || null;

  if (route.messageType === "support_portal") {
    return `Entendi sua solicitação. 😊

Para que nossa equipe técnica acompanhe adequadamente a ocorrência, peço que registre o chamado através do portal:

${SUPPORT_PORTAL_URL}

Após o registro, o atendimento seguirá pelo fluxo técnico apropriado.`;
  }

  if (route.messageType === "financial_handoff") {
    return `Entendi${name ? `, ${name}` : ""}. 😊

Vou direcionar sua solicitação para o *setor financeiro* dar continuidade.`;
  }

  if (route.messageType === "supplier_validation") {
    return `Recebi aqui. 😊

Vou validar internamente e te retorno.`;
  }

  if (route.messageType === "hr_handoff") {
    return `Recebi seu contato. 😊

Você pode enviar seu currículo para *vagas@v6tecnologia.com.br*, juntamente com a área de interesse.`;
  }

  if (route.messageType === "partnership_context") {
    return `Obrigado pelo contato. 😊

Pode me enviar um breve contexto da parceria para que eu direcione internamente da forma correta?`;
  }

  if (route.messageType === "commercial_qualification") {
    if (interest) {
      return `Olá${name ? `, *${name}*` : ""}! 😊

Vi que anteriormente conversamos sobre *${interest}*.

Para avançarmos, me conta qual é o principal objetivo que você deseja alcançar agora com essa demanda?`;
    }

    return `Perfeito${name ? `, ${name}` : ""}. 😊

Para eu te direcionar melhor, me conta rapidamente qual é o principal objetivo com esse atendimento inteligente no WhatsApp?`;
  }

  if (interest) {
    return `Olá${name ? `, *${name}*` : ""}! 😊

Vi que estávamos conversando sobre *${interest}*${temperature ? ` e sua oportunidade está classificada como *${temperature}*` : ""}.

Como gostaria de avançar a partir daqui?`;
  }

  return `Olá${name ? `, *${name}*` : ""}! 😊

Como posso te ajudar hoje?`;
}

module.exports = {
  buildHelenaMessage
};
