import { useState } from "react";
import "./App.css";
import { Calculator } from "./components/Calculator";
import { AccountButton } from "./components/AccountButton";
function App() {
  const [user, setUser] = useState<string | null>(null);

  return (
    <>
      <AccountButton user={user} setUser={setUser} />
      <Calculator user={user} />
    </>
  );
}

export default App;
