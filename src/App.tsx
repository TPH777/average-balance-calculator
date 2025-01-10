import { useState } from "react";
import "./App.css";
import { Calculator } from "./components/Calculator";
import "bootstrap/dist/css/bootstrap.min.css";
import { AccountButton } from "./components/AccountButton";
import { Header } from "./components/Header";

function App() {
  const [user, setUser] = useState<string | null>(null);

  return (
    <>
      <Header />
      <Calculator user={user} />
      <AccountButton user={user} setUser={setUser} />
    </>
  );
}

export default App;
