const {
  classifyIntent
} = require("./intent-classifier");

console.log(
  "SUPORTE:",
  classifyIntent("Minha impressora parou novamente.")
);

console.log(
  "FINANCEIRO:",
  classifyIntent("Preciso da segunda via do boleto.")
);

console.log(
  "PARCERIA:",
  classifyIntent("Gostaria de propor uma parceria.")
);

console.log(
  "FORNECEDOR:",
  classifyIntent("Tenho uma proposta de fornecimento.")
);

console.log(
  "RH:",
  classifyIntent("Gostaria de enviar meu currículo.")
);

console.log(
  "AGENDAMENTO:",
  classifyIntent("Quero agendar uma reunião.")
);

console.log(
  "COMERCIAL:",
  classifyIntent("Tenho interesse em um agente IA para WhatsApp.")
);

console.log(
  "GERAL:",
  classifyIntent("Bom dia, tudo bem?")
);
