import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  }, []);

  async function loadLeads() {
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setLeads(data || []);
    setLoading(false);
  }

  const totalLeads = leads.length;
  const leadsQuentes = leads.filter(
    (l) => l.lead_temperature === "quente"
  ).length;

  const leadsMornos = leads.filter(
    (l) => l.lead_temperature === "morno"
  ).length;

  const novos = leads.filter(
    (l) => l.status === "new"
  ).length;

  return (
    <>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Dashboard</h1>
          <p style={styles.subtitle}>
            Controle operacional dos agentes da V6 Tecnologia
          </p>
        </div>

        <button style={styles.button} onClick={loadLeads}>
          Atualizar
        </button>
      </header>

      <section style={styles.cards}>
        <Card title="Leads totais" value={totalLeads} />
        <Card title="Leads quentes" value={leadsQuentes} />
        <Card title="Leads mornos" value={leadsMornos} />
        <Card title="Novos atendimentos" value={novos} />
      </section>

      <section style={styles.panel}>
        <div style={styles.panelHeader}>
          <h2 style={styles.panelTitle}>Leads recentes</h2>
          <span style={styles.badge}>Helena • WhatsApp</span>
        </div>

        {loading ? (
          <p>Carregando leads...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Nome</th>
                <th style={styles.th}>Empresa</th>
                <th style={styles.th}>Cidade</th>
                <th style={styles.th}>Interesse</th>
                <th style={styles.th}>Temperatura</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>

            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id}>
                  <td style={styles.td}>{lead.name || "-"}</td>
                  <td style={styles.td}>{lead.company || "-"}</td>
                  <td style={styles.td}>{lead.city || "-"}</td>
                  <td style={styles.td}>{lead.interest || "-"}</td>
                  <td style={styles.td}>
                    <span style={getTempStyle(lead.lead_temperature)}>
                      {lead.lead_temperature || "não classificado"}
                    </span>
                  </td>
                  <td style={styles.td}>{lead.status || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </>
  );
}

function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <span style={styles.cardTitle}>{title}</span>
      <strong style={styles.cardValue}>{value}</strong>
    </div>
  );
}

function getTempStyle(temp) {
  const base = {
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase"
  };

  if (temp === "quente") {
    return {
      ...base,
      background: "#fee2e2",
      color: "#991b1b"
    };
  }

  if (temp === "morno") {
    return {
      ...base,
      background: "#fef3c7",
      color: "#92400e"
    };
  }

  return {
    ...base,
    background: "#e5e7eb",
    color: "#374151"
  };
}

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "26px"
  },
  title: {
    margin: 0,
    fontSize: "34px"
  },
  subtitle: {
    marginTop: "8px",
    color: "#6b7280"
  },
  button: {
    background: "#111827",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 18px",
    cursor: "pointer"
  },
  cards: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "18px",
    marginBottom: "26px"
  },
  card: {
    background: "#fff",
    padding: "22px",
    borderRadius: "16px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)"
  },
  cardTitle: {
    color: "#6b7280",
    fontSize: "14px"
  },
  cardValue: {
    display: "block",
    marginTop: "12px",
    fontSize: "32px"
  },
  panel: {
    background: "#fff",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)"
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px"
  },
  panelTitle: {
    margin: 0
  },
  badge: {
    background: "#ecfdf5",
    color: "#047857",
    padding: "8px 12px",
    borderRadius: "999px",
    fontWeight: "700",
    fontSize: "13px"
  },
  table: {
    width: "100%",
    borderCollapse: "collapse"
  },
  th: {
    textAlign: "left",
    padding: "14px",
    borderBottom: "1px solid #e5e7eb",
    color: "#6b7280",
    fontSize: "13px"
  },
  td: {
    padding: "14px",
    borderBottom: "1px solid #f3f4f6"
  }
};

export default Dashboard;
