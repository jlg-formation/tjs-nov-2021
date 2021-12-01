import { map, switchMap, timeout } from "rxjs/operators";
import { fromFetch } from "rxjs/fetch";
import { Article } from "../interfaces/Article";
import { Observable } from "rxjs";

const url = "http://localhost:3500/api/articles";

class ArticleService {
  add(newArticle: {
    name: string;
    price: number;
    qty: number;
  }): Observable<void> {
    return fromFetch(url, {
      method: "POST",
      body: JSON.stringify(newArticle),
      headers: {
        "Content-Type": "application/json",
      },
    }).pipe(
      timeout(5000),
      map((response) => {
        if (response.status !== 201) {
          console.error("cannot add article", response);
          throw new Error("error while adding");
        }
        return;
      })
    );
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
