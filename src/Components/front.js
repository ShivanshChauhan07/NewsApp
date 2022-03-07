import React from "react";
import { useFetch } from "./getData";
export const useFront = (url, isCalled) => {
  const { loading, products } = useFetch(url, isCalled);
  return (
    <div>
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <article className="newslist">
          {products.articles?.map((article, index) => {
            return (
              <div className="box" key={index}>
                {article.imageToUrl || (
                  <img
                    src={article.urlToImage}
                    alt="description of image"
                    style={{ width: "300px", height: "250px" }}
                  ></img>
                )}
                <h1>{article.title}</h1>
                <h4>{article.author}</h4>
                <p>{article.description}</p>
                <a
                  href={article.url}
                  className="btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  Read more
                </a>
              </div>
            );
          })}
        </article>
      )}
    </div>
  );
};
