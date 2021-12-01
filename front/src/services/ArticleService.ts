import { switchMap, timeout } from "rxjs/operators";
import { fromFetch } from "rxjs/fetch";
import { Article } from "../interfaces/Article";

const url = "http://localhost:3500/api/articles";

class ArticleService {
  add(newArticle: {
    name: string;
    price: number;
    qty: number;
  }): import("rxjs").Observable<unknown> {
    throw new Error("Method not implemented.");
  }

  get() {
    return fromFetch(url).pipe(
      timeout(5000),
      switchMap((response) => {
        return response.json() as Promise<Article[]>;
      })
    );
  }
}

export const articleService = new ArticleService();
