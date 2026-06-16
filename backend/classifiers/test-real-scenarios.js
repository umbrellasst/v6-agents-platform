const { classifyRelationship } = require("./relationship-classifier");
const { classifyIntent } = require("./intent-classifier");
const { routeHelena } = require("./routing-engine");

function testScenario(label, contact, message) {
  const relationshipType = classifyRelationship({ contact, message });
  const intentType = classifyIntent(message);
  const route = routeHelena({ relationshipType, intentType });

  console.log(`\n=== ${label} ===`);
  console.log({
    message,
    relationshipType,
    intentType,
    route
  });
}

testScenario(
  "Cliente contrato com problema técnico",
  {
    name: "Cliente Contrato",
    company: "Empresa Cliente",
    is_contract_client: true
  },
  "Minha impressora parou novamente."
);

testScenario(
  "Lead interessado em agente",
  {
    name: "Lead Comercial",
    company: "Empresa Lead",
    is_contract_client: false
  },
  "Tenho interesse em um agente IA para WhatsApp."
);

testScenario(
  "Fornecedor enviando material",
  {
    name: "Fornecedor",
    company: "Fornecedor Tech",
    is_contract_client: false
  },
  "Gostaria de apresentar nossos serviços e enviar um material promocional."
);

testScenario(
  "Cliente pedindo financeiro",
  {
    name: "Cliente Financeiro",
    company: "Empresa Cliente",
    is_contract_client: true
  },
  "Preciso da segunda via do boleto."
);

testScenario(
  "Candidato enviando currículo",
  {
    name: "Candidato",
    company: "",
    is_contract_client: false
  },
  "Gostaria de enviar meu currículo para uma vaga."
);
