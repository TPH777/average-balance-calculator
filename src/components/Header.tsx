import logo from "../pictures/balance-logo.svg";

export function Header() {
  return (
    <header className="site-header">
      <img src={logo} className="logo-img" alt="Average Balance Calculator" />
      <div>
        <p className="site-kicker">Personal banking planner</p>
        <h1 className="site-title">Average Balance Calculator</h1>
      </div>
    </header>
  );
}
