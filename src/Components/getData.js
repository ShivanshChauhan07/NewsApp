import { useState, useEffect, useCallback } from "react";

export const useFetch = (url, isCalled) => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState({ articles: [], totalResults: "" });
  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      if (isCalled) {
        const response = await fetch(url);
        const { articles, totalResults } = await response.json();
        if (articles) setProducts({ articles, totalResults });
        setLoading(false);
      }
    } catch {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    getProducts();
  }, [url, getProducts]);
  return { loading, products };
};
