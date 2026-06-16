import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Agents() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    const { data, error } = await supabase
      .from("conversation_history")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      setLoading(false);
      return;
    }

    setHistory(data || []);
    setLoading(false);
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Conversas</h1>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        history.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "12px"
            }}
          >
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              {item.direction}
            </div>

            <div style={{ marginTop: "8px" }}>
              {item.message}
            </div>

            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                color: "#9ca3af"
              }}
            >
              {item.created_at}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Agents;
