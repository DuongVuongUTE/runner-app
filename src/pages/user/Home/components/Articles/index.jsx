import React from "react";
import * as Style from "./style";

function ArticlesHome({ articlesList }) {
  function renderArticles() {
    return articlesList.map((article, index) => {
      return (
        <Style.ArticleItem key={index}>
          <div className="article-img">
            <img src={article.thumb} alt="" />
          </div>
          <div className="article-content">
            <span>{article.createdAt}</span>
            <h2>
              <title>{article.title}</title>
            </h2>
            <p>{article.desc}</p>
          </div>
        </Style.ArticleItem>
      );
    });
  }
  return <Style.ArticleList>{renderArticles()}</Style.ArticleList>;
}

export default ArticlesHome;
