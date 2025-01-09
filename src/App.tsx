import { useState } from "react";
import "./App.css";
import { Calculator } from "./components/Calculator";
import "bootstrap/dist/css/bootstrap.min.css";
import { AccountButton } from "./components/AccountButton";

function App() {
  const [user, setUser] = useState<string | null>(null);

  return (
    <>
      <h1 className="site-title">Average Balance Calculator</h1>
      <Calculator user={user} />
      <AccountButton user={user} setUser={setUser} />
    </>
  );
}

export default App;
