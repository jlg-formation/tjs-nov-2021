import { Link } from "react-router-dom";

function AppHome() {
  return (
    <main className="home">
      <h1>Gérer votre stock efficacement.</h1>
      <Link to="/stock">
        <button className="primary">Voir le stock</button>
      </Link>
    </main>
  );
}

export default AppHome;
