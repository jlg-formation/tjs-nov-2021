import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { useNavigate } from "react-router";
import { lastValueFrom } from "rxjs";
import { articleService } from "../services/ArticleService";

function AppStockAdd() {
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const [newArticle, setNewArticle] = useState({
    name: "Tournevis",
    price: 1.24,
    qty: 56,
  });
  const handleChange =
    (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
      console.log("onChange sur " + field);
      const na = { ...newArticle, [field]: event.target.value };
      setNewArticle(na);
      console.log("na: ", na);
    };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log("submit");

    (async () => {
      try {
        // 1) add the new Article to the article list
        setError("");
        setIsAdding(true);
        // await lastValueFrom(timer(2000));
        await lastValueFrom(articleService.add(newArticle));
        setIsAdding(false);
        // 2) redirect vers /stock
        navigate("/stock");
      } catch (err) {
        console.log("err: ", err);
        setIsAdding(false);
        setError("oups... Cannot add the article");
      }
    })();
  };

  return (
    <main>
      <h1>Ajouter un article</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <div>Nom</div>
          <input
            type="text"
            value={newArticle.name}
            onChange={handleChange("name")}
          />
        </label>
        <label>
          <div>Prix</div>
          <input
            type="number"
            value={newArticle.price}
            onChange={handleChange("price")}
          />
        </label>
        <label>
          <div>Quantité</div>
          <input
            type="number"
            value={newArticle.qty}
            onChange={handleChange("qty")}
          />
        </label>
        <button className="primary">
          <span
            className={isAdding ? "icon-spin5 animate-spin" : "icon-plus"}
          ></span>
          Ajouter
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </main>
  );
}

export default AppStockAdd;
