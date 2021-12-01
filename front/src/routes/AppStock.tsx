import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Article } from "../interfaces/Article";
import { articleService } from "../services/ArticleService";

function AppStock() {
  const [isLoading, setIsLoading] = useState(true);
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    articleService.get().subscribe({
      next: (articles) => {
        setArticles(articles);
        setIsLoading(false);
      },
      complete: () => {
        console.log("complete");
      },
      error: (err) => {
        console.log("err: ", err);
        setIsLoading(false);
        setError("eh zut, j'arrive pas à charger les articles...");
      },
    });
  }, []);

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
        {isLoading ? (
          <span>is loading...</span>
        ) : error !== "" ? (
          <span className="error">{error}</span>
        ) : (
          <table>
            <thead>
              <tr>
                <th className="name">Nom</th>
                <th className="price">Prix</th>
                <th className="qty">Quantité</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((a) => (
                <tr key={a.id}>
                  <td className="name">{a.name}</td>
                  <td className="price">{a.price} €</td>
                  <td className="qty">{a.qty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}

export default AppStock;
