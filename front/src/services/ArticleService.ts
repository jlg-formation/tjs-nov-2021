import {
  catchError,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
  timeout,
} from "rxjs/operators";
import { fromFetch } from "rxjs/fetch";
import { Article } from "../interfaces/Article";
import { BehaviorSubject, Observable, of } from "rxjs";

const url = "/api/articles";

class ArticleService {
  private isServerReachablePrivate$ = new BehaviorSubject(true);
  isServerReachable$ = this.isServerReachablePrivate$.pipe(
    distinctUntilChanged()
  );

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
        if (response.status >= 400) {
          throw new Error("error from server");
        }
        return response.json() as Promise<Article[]>;
      }),
      tap((articles) => {
        localStorage.setItem("articles", JSON.stringify(articles));
        this.isServerReachablePrivate$.next(true);
      }),
      catchError((err) => {
        console.log("err: ", err);
        this.isServerReachablePrivate$.next(false);
        const str = localStorage.getItem("articles");
        if (!str) {
          throw new Error("no localstorage");
        }
        const articles = JSON.parse(str) as Article[];
        return of(articles);
      })
    );
  }

  remove(ids: string[]): Observable<void> {
    return fromFetch(url, {
      method: "DELETE",
      body: JSON.stringify(ids),
      headers: {
        "Content-Type": "application/json",
      },
    }).pipe(
      timeout(5000),
      map((response) => {
        if (response.status !== 204) {
          console.error("cannot add article", response);
          throw new Error("error while adding");
        }
        return;
      })
    );
  }
}

export const articleService = new ArticleService();
