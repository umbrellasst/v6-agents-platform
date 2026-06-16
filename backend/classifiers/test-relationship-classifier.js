const {
  classifyRelationship
} = require("./relationship-classifier");

console.log(
  "FORNECEDOR:",
  classifyRelationship({
    message:
      "Gostaria de apresentar nossos serviços e uma proposta de fornecimento."
  })
);

console.log(
  "PARCEIRO:",
  classifyRelationship({
    message:
      "Temos interesse em uma parceria comercial entre as empresas."
  })
);

console.log(
  "CANDIDATO:",
  classifyRelationship({
    message:
      "Gostaria de enviar meu currículo para uma oportunidade."
  })
);

console.log(
  "CLIENTE CONTRATO:",
  classifyRelationship({
    contact: {
      is_contract_client: true
    },
    message:
      "Minha impressora parou novamente."
  })
);

console.log(
  "LEAD:",
  classifyRelationship({
    message:
      "Tenho interesse em um agente comercial para WhatsApp."
  })
);
