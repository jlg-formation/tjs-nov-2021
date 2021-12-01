import { format } from "path";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { lastValueFrom } from "rxjs";
import { Article } from "../interfaces/Article";
import { articleService } from "../services/ArticleService";

function AppStock() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedArticles, setSelectedArticles] = useState(new Set<Article>());

  const refresh = () => {
    setSelectedArticles(new Set());
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
  };

  const handleRefresh = () => {
    console.log("handleRefresh");
    setIsLoading(true);
    setError("");
    refresh();
  };

  const handleClick = (a: Article) => () => {
    console.log("click");
    const newSet = new Set(selectedArticles);
    newSet.has(a) ? newSet.delete(a) : newSet.add(a);
    setSelectedArticles(newSet);
  };

  const handleRemove = () => {
    (async () => {
      try {
        setError("");
        setIsRemoving(true);
        await lastValueFrom(
          articleService.remove([...selectedArticles].map((a) => a.id))
        );
        refresh();
      } catch (err) {
        console.log("err: ", err);
        setError("oups... Cannot delete");
      } finally {
        setIsRemoving(false);
      }
    })();
  };

  const format = (nbr: number): string => {
    if (typeof nbr !== "number") {
      return "";
    }
    return nbr.toFixed(2) + " €";
  };

  useEffect(refresh, []);

  return (
    <main>
      <h1>Liste des articles</h1>
      <div className="content">
        <nav>
          <button onClick={handleRefresh}>
            <span
              className={"icon-spin3" + (isLoading ? " animate-spin" : "")}
            ></span>
          </button>
          <Link to="add">
            <button>
              <span className="icon-plus"></span>
            </button>
          </Link>
          {selectedArticles.size > 0 && (
            <button onClick={handleRemove}>
              <span
                className={
                  isRemoving ? "icon-spin5 animate-spin" : "icon-trash"
                }
              ></span>
            </button>
          )}
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
                <tr
                  key={a.id}
                  onClick={handleClick(a)}
                  className={selectedArticles.has(a) ? "selected" : ""}
                >
                  <td className="name">{a.name}</td>
                  <td className="price">{format(a.price)}</td>
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
