import React from "react";
import { useFront } from "./Components/front";
import { useState, useEffect } from "react";

const giveMeSearchUrl = (val, pageSize) => {
  const url = `http://newsapi.org/v2/everything?q=${val}&pageSize=${pageSize}&sortBy=publishedAt&apiKey=d0d7c9bef6ab4396b048fef3b4fa40f3 `;
  return url;
};

const giveMeFrontPageURL = (pageSize) => {
  const url = `http://newsapi.org/v2/top-headlines?country=in&pageSize=${pageSize}&apiKey=d0d7c9bef6ab4396b048fef3b4fa40f3 `;
  return url;
};

const App = () => {
  const [pageSize, setPageSize] = useState(21);
  const [isCalled, setIsCalled] = useState(false);
  const [val, setVal] = useState("");
  const [category, setCategory] = useState("");
  const [currurl, setCururl] = useState(giveMeFrontPageURL(21));
  const [searchUrl, setSearchUrl] = useState(giveMeSearchUrl("", 21));

  const handleSubmit = () => {
    setIsCalled(true);
    setPageSize(21);
    const newUrl = giveMeSearchUrl(val, pageSize);
    if (val) setSearchUrl(newUrl);
  };

  const handleValChange = (e) => {
    setVal(e.target.value);
    setIsCalled(true);
  };

  const handleLoadMore = () => {
    setPageSize(pageSize + 21);
  };

  useEffect(() => {
    if (!val) {
      const newUrlFront = giveMeFrontPageURL(pageSize);
      setCururl(newUrlFront);
    } else {
      const newUrl = giveMeSearchUrl(val, pageSize);
      setSearchUrl(newUrl);
    }
  }, [pageSize]);

  useEffect(() => {
    if (category) {
      setVal(category);
      setIsCalled(true);
      setPageSize(21);
      const newUrl = giveMeSearchUrl(category, pageSize);
      setSearchUrl(newUrl);
    }
  }, [category]);

  return (
    <React.Fragment>
      <h2 style={{ textAlign: "center", marginTop: "10px" }}>News Kingdom</h2>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="What are you looking for?"
            value={val}
            onChange={(e) => handleValChange(e)}
          />
          <button type="submit" className="searchButton" onClick={handleSubmit}>
            Search
          </button>
          <select
            className="selectCategory"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="">Select Category</option>
            <option value="Tech">Tech</option>
            <option value="Bussiness">Bussiness</option>
            <option value="Food">Food</option>
            <option value="Economics">Economics</option>
            <option value="Health">Health</option>
            <option value="Geo Politics">Geo Politics</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
      </div>
      {useFront(val ? searchUrl : currurl, val ? isCalled : true)}
      <div className="wrapper">
        <button className="btn" onClick={handleLoadMore}>
          Load more
        </button>
      </div>
    </React.Fragment>
    //some changes
  );
};

export default App;
