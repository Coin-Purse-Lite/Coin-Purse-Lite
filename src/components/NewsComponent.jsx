import React, { useState, useEffect } from "react";
import "../styles/NewsComponent.css";

const NewsList = () => {
  const [newsData, setNewsData] = useState([]);

  // UNCOMMENT THIS TO MAKE NEWS WORK

//   useEffect(() => {
//     fetch('https://newsdata.io/api/1/news?apikey=pub_15756f4c306903b3dad2ec9ca6134e06324ae&q=crypto&language=en ')
//         .then(res => res.json())
//         .then(data => {
//             setNewsData(data.results);
//         })
//         .catch(err => console.log(err));
//   }, []);

  return (
    <div className="news-list-container bg-white">
      <div className="news-list-scroll bg-white">
        {newsData.map((article, index) => (
          <div key={index} className="news-list-item bg-white">
            <h1 className="bg-white" style={{ fontWeight: "500" }}>
              {article.title}
            </h1>
            <p className="bg-white">{article.description}</p>
            <a
              className="bg-white"
              style={{ color: "blue", textDecoration: "underline" }}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsList;
