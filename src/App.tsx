import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Calculator } from "./components/Calculator";
import { AccountButton } from "./components/AccountButton";
import { Header } from "./components/Header";

function App() {
  const [user, setUser] = useState<string | null>(null);

  return (
    <main className="app-shell">
      <section className="dashboard-shell">
        <div className="dashboard-topbar">
          <Header />
          <AccountButton user={user} setUser={setUser} />
        </div>
        <Calculator user={user} />
      </section>
    </main>
  );
}

export default App;
