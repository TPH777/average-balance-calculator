import { useState } from "react";
import "./App.css";
import { Calculator } from "./components/Calculator";
import "bootstrap/dist/css/bootstrap.min.css";
import { TitleBar } from "./components/TitleBar";

function App() {
  const [user, setUser] = useState<string | null>(null);

  return (
    <>
      <TitleBar user={user} setUser={setUser} />
      <Calculator user={user} />
    </>
  );
}

export default App;
