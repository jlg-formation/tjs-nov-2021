import { articleService } from "./../services/ArticleService";
import { createContext } from "react";

export const ArticleContext = createContext(articleService);
