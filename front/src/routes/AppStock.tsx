import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { lastValueFrom } from "rxjs";
import { ArticleContext } from "../contexts/ArticleContext";
import { CurrencyContext } from "../contexts/CurrencyContext";
import { LocaleContext } from "../contexts/LocaleContext";
import { Article } from "../interfaces/Article";

type Layout = "table" | "card";

function AppStock() {
  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedArticles, setSelectedArticles] = useState(new Set<Article>());
  const localeStr = useContext(LocaleContext);
  const currencyStr = useContext(CurrencyContext);
  const articleService = useContext(ArticleContext);
  const [layout, setLayout] = useState<Layout>("card");

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
    return new Intl.NumberFormat(localeStr, {
      style: "currency",
      currency: currencyStr,
    }).format(nbr);
  };

  const handleGridLayout = () => {
    if (layout === "card") {
      setLayout("table");
      return;
    }
    setLayout("card");
  };

  useEffect(refresh, [articleService]);

  return (
    <main>
      <h1>Liste des articles</h1>
      <div className="content">
        <div className="toolbar">
          <nav>
            <button onClick={handleRefresh}>
              <span
                className={"icon-spin3" + (isLoading ? " animate-spin" : "")}
              ></span>
            </button>
            <Link to="add">
              <button aria-label="Ajouter">
                <span className="icon-plus"></span>
              </button>
            </Link>
            {selectedArticles.size > 0 && (
              <button onClick={handleRemove} aria-label="Supprimer">
                <span
                  className={
                    isRemoving ? "icon-spin5 animate-spin" : "icon-trash"
                  }
                ></span>
              </button>
            )}
          </nav>
          <nav>
            <button onClick={handleGridLayout}>
              <span
                className={layout === "card" ? "icon-th-list" : "icon-th-large"}
              ></span>
            </button>
          </nav>
        </div>

        {isLoading ? (
          <table className={"skeleton " + layout}>
            <thead>
              <tr>
                <th className="name">Nom</th>
                <th className="price">Prix</th>
                <th className="qty">Quantité</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3].map((a) => (
                <tr key={a}>
                  <td className="name">x</td>
                  <td className="price">x</td>
                  <td className="qty">x</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : error !== "" ? (
          <span className="error">{error}</span>
        ) : (
          <table className={layout}>
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
