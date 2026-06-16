import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Leads() {
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

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.title}>Leads</h1>
          <p style={styles.subtitle}>
            CRM operacional dos atendimentos captados pelos agentes.
          </p>
        </div>

        <button style={styles.button} onClick={loadLeads}>
          Atualizar
        </button>
      </header>

      <section style={styles.panel}>
        {loading ? (
          <p>Carregando leads...</p>
        ) : (
          <div style={styles.tableScroll}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Nome</th>
                  <th style={styles.th}>Empresa</th>
                  <th style={styles.th}>Telefone</th>
                  <th style={styles.th}>Cidade</th>
                  <th style={styles.th}>Interesse</th>
                  <th style={styles.th}>Temperatura</th>
                  <th style={styles.th}>Status</th>
                  <th style={styles.th}>Criado em</th>
                </tr>
              </thead>

              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td style={styles.td}>{lead.name || "-"}</td>
                    <td style={styles.td}>{lead.company || "-"}</td>
                    <td style={styles.td}>{lead.phone || "-"}</td>
                    <td style={styles.td}>{lead.city || "-"}</td>
                    <td style={styles.td}>{lead.interest || "-"}</td>
                    <td style={styles.td}>
                      <span style={getTempStyle(lead.lead_temperature)}>
                        {lead.lead_temperature || "não classificado"}
                      </span>
                    </td>
                    <td style={styles.td}>{lead.status || "-"}</td>
                    <td style={styles.td}>{formatDate(lead.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function formatDate(value) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Bahia"
  }).format(new Date(value));
}

function getTempStyle(temp) {
  const base = {
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
    textTransform: "uppercase",
    display: "inline-block"
  };

  if (temp === "quente") return { ...base, background: "#fee2e2", color: "#991b1b" };
  if (temp === "morno") return { ...base, background: "#fef3c7", color: "#92400e" };
  if (temp === "frio") return { ...base, background: "#dbeafe", color: "#1e40af" };

  return { ...base, background: "#e5e7eb", color: "#374151" };
}

const styles = {
  wrapper: {
    maxWidth: "100%",
    overflow: "hidden"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "20px",
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
    cursor: "pointer",
    whiteSpace: "nowrap"
  },
  panel: {
    background: "#fff",
    borderRadius: "18px",
    padding: "24px",
    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
    maxWidth: "100%",
    overflow: "hidden"
  },
  tableScroll: {
    width: "100%",
    overflowX: "auto"
  },
  table: {
    width: "100%",
    minWidth: "920px",
    borderCollapse: "collapse"
  },
  th: {
    textAlign: "left",
    padding: "14px",
    borderBottom: "1px solid #e5e7eb",
    color: "#6b7280",
    fontSize: "13px",
    whiteSpace: "nowrap"
  },
  td: {
    padding: "14px",
    borderBottom: "1px solid #f3f4f6",
    verticalAlign: "top",
    fontSize: "14px"
  }
};

export default Leads;
