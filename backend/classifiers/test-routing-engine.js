const { routeHelena } = require("./routing-engine");

console.log(
  "CLIENTE CONTRATO + SUPORTE:",
  routeHelena({
    relationshipType: "client_contract",
    intentType: "support"
  })
);

console.log(
  "FORNECEDOR:",
  routeHelena({
    relationshipType: "supplier",
    intentType: "supplier"
  })
);

console.log(
  "PARCEIRO:",
  routeHelena({
    relationshipType: "partner",
    intentType: "partnership"
  })
);

console.log(
  "FINANCEIRO:",
  routeHelena({
    relationshipType: "client_contract",
    intentType: "financial"
  })
);

console.log(
  "COMERCIAL:",
  routeHelena({
    relationshipType: "lead",
    intentType: "commercial"
  })
);

console.log(
  "GERAL:",
  routeHelena({
    relationshipType: "lead",
    intentType: "general"
  })
);
