function Layout({ currentPage, onNavigate, children }) {
  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "leads", label: "Leads" },
    { key: "agents", label: "Agentes" },
    { key: "settings", label: "Configurações" }
  ];

  return (
    <div style={styles.page}>
      <aside style={styles.sidebar}>
        <div style={styles.logo}>V6</div>
        <h2 style={styles.brand}>V6 Agents</h2>

        <nav style={styles.nav}>
          {menuItems.map((item) => (
            <button
              key={item.key}
              style={
                currentPage === item.key
                  ? { ...styles.navButton, ...styles.navActive }
                  : styles.navButton
              }
              onClick={() => onNavigate(item.key)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main style={styles.main}>{children}</main>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "#f3f4f6",
    fontFamily: "Arial, sans-serif",
    color: "#111827"
  },
  sidebar: {
    width: "240px",
    background: "#111827",
    color: "#fff",
    padding: "28px 22px",
    flexShrink: 0
  },
  logo: {
    width: "44px",
    height: "44px",
    borderRadius: "12px",
    background: "#dc2626",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    marginBottom: "14px"
  },
  brand: {
    margin: "0 0 32px",
    fontSize: "22px"
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "14px"
  },
  navButton: {
    background: "transparent",
    border: "none",
    color: "#d1d5db",
    textAlign: "left",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "15px"
  },
  navActive: {
    background: "#374151",
    color: "#fff"
  },
  main: {
    flex: 1,
    padding: "34px",
    minHeight: "100vh",
    background: "#f3f4f6",
    overflowX: "hidden"
  }
};

export default Layout;
