import React, { useEffect, useState } from 'react';

import './profile.css';

const Dashboard = () => {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  
  const [searchHistory, setSearchHistory] = useState([]);
  
 
//=============================================
 

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=YOUR_API_KEY&q=${searchTerm}`);
        const data = await response.json();

        if (data.status === 'ok') {
          const articlesWithImages = data.articles.filter(article => article.urlToImage);
          setNews(articlesWithImages);
        } else {
          console.error('Failed to fetch news.');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    

    fetchNews();
    
  }, [searchTerm]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm) {
      const existingSearchHistory = searchHistory;
      if (!existingSearchHistory.includes(searchTerm)) {
        existingSearchHistory.push(searchTerm);
        setSearchHistory(existingSearchHistory);
        localStorage.setItem('searchHistory', JSON.stringify(existingSearchHistory));
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.href = '/login';
  };

  const filteredNews = news.filter((article) => {
    return article.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div>
      <h1>Welcome To App !</h1>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <div className="search-bar">
        <input type="search" value={searchTerm} onChange={handleSearch} placeholder="Search news" />
        <button type="submit">
          <i className="fa fa-search"></i>
        </button>
        
      </div>
      
        <div className='container'>
          {filteredNews.map((article, index) => (
            <div key={index} className="card">
              <img src={article.urlToImage} alt="News" />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <a href={article.url}>Read More</a>
            </div>
          ))}
        </div>
      ) 
    </div>
  );
};

export default Dashboard;
