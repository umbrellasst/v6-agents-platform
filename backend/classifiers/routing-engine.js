function routeHelena({ relationshipType, intentType }) {
  if (relationshipType === "client_contract" && intentType === "support") {
    return {
      action: "send_portal_link",
      department: "suporte",
      shouldDiagnose: false,
      shouldAskTechnicalQuestions: false,
      shouldHandoff: false,
      messageType: "support_portal"
    };
  }

  if (intentType === "financial") {
    return {
      action: "handoff",
      department: "financeiro",
      shouldDiagnose: false,
      shouldAskTechnicalQuestions: false,
      shouldHandoff: true,
      messageType: "financial_handoff"
    };
  }

  if (relationshipType === "supplier" || intentType === "supplier") {
    return {
      action: "collect_and_validate",
      department: "administrativo",
      shouldDiagnose: false,
      shouldAskTechnicalQuestions: false,
      shouldHandoff: true,
      messageType: "supplier_validation"
    };
  }

  if (relationshipType === "candidate" || intentType === "hr") {
    return {
      action: "handoff",
      department: "rh",
      shouldDiagnose: false,
      shouldAskTechnicalQuestions: false,
      shouldHandoff: true,
      messageType: "hr_handoff"
    };
  }

  if (relationshipType === "partner" || intentType === "partnership") {
    return {
      action: "collect_context",
      department: "comercial",
      shouldDiagnose: false,
      shouldAskTechnicalQuestions: false,
      shouldHandoff: true,
      messageType: "partnership_context"
    };
  }

  if (intentType === "commercial") {
    return {
      action: "qualify_lead",
      department: "comercial",
      shouldDiagnose: false,
      shouldAskTechnicalQuestions: false,
      shouldHandoff: false,
      messageType: "commercial_qualification"
    };
  }

  return {
    action: "general_triage",
    department: "atendimento",
    shouldDiagnose: false,
    shouldAskTechnicalQuestions: false,
    shouldHandoff: false,
    messageType: "general"
  };
}

module.exports = {
  routeHelena
};
