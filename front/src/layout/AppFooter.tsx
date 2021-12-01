import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArticleContext } from "../contexts/ArticleContext";

function AppFooter() {
  const articleService = useContext(ArticleContext);
  const [serverStatus, setServerStatus] = useState(true);

  useEffect(() => {
    articleService.isServerReachable$.subscribe({
      next: (s) => {
        setServerStatus(s);
      },
    });
  }, [articleService]);
  return (
    <footer>
      <Link to="/legal">Mentions Légales</Link>
      <div>Server Status : {serverStatus ? "on" : "off"}</div>
    </footer>
  );
}

export default AppFooter;
