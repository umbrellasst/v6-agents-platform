import { useState } from "react";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Agents from "./pages/Agents";
import Settings from "./pages/Settings";

function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const pages = {
    dashboard: <Dashboard />,
    leads: <Leads />,
    agents: <Agents />,
    settings: <Settings />
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {pages[currentPage]}
    </Layout>
  );
}

export default App;
