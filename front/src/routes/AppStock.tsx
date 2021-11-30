import { Link } from "react-router-dom";

function AppStock() {
  return (
    <main>
      <h1>Liste des articles</h1>
      <div className="content">
        <nav>
          <button>
            <span className="icon-spin3"></span>
          </button>
          <Link to="add">
            <button>
              <span className="icon-plus"></span>
            </button>
          </Link>
          <button>
            <span className="icon-trash"></span>
          </button>
        </nav>
        <table>
          <thead>
            <tr>
              <th className="name">Nom</th>
              <th className="price">Prix</th>
              <th className="qty">Quantité</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="name">Tournevis</td>
              <td className="price">1.23 €</td>
              <td className="qty">450</td>
            </tr>
            <tr>
              <td className="name">Tournevis Cruciforme</td>
              <td className="price">11.23 €</td>
              <td className="qty">50</td>
            </tr>
            <tr>
              <td className="name">Tournevis</td>
              <td className="price">1.23 €</td>
              <td className="qty">450</td>
            </tr>
            <tr>
              <td className="name">Tournevis</td>
              <td className="price">1.23 €</td>
              <td className="qty">450</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default AppStock;
