const { buildHelenaMessage } = require("./message-builder");

console.log(
  "\nSUPORTE:\n",
  buildHelenaMessage({
    route: {
      messageType: "support_portal"
    },
    contact: {
      name: "Victor"
    }
  })
);

console.log(
  "\nFINANCEIRO:\n",
  buildHelenaMessage({
    route: {
      messageType: "financial_handoff"
    },
    contact: {
      name: "Victor"
    }
  })
);

console.log(
  "\nFORNECEDOR:\n",
  buildHelenaMessage({
    route: {
      messageType: "supplier_validation"
    },
    contact: {
      name: "Fornecedor"
    }
  })
);

console.log(
  "\nRH:\n",
  buildHelenaMessage({
    route: {
      messageType: "hr_handoff"
    },
    contact: {
      name: "Candidato"
    }
  })
);

console.log(
  "\nPARCERIA:\n",
  buildHelenaMessage({
    route: {
      messageType: "partnership_context"
    },
    contact: {
      name: "Parceiro"
    }
  })
);

console.log(
  "\nCOMERCIAL:\n",
  buildHelenaMessage({
    route: {
      messageType: "commercial_qualification"
    },
    contact: {
      name: "Victor"
    }
  })
);
