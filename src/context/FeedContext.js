import React, { createContext, useState, useEffect } from 'react';

export const FeedContext = createContext();

export const FeedProvider = ({ children }) => {
  const [feeds, setFeeds] = useState([]);
  const [articles, setArticles] = useState([]);
  const [selectedFeedId, setSelectedFeedId] = useState(null);

  const loadFeeds = async () => {
    const loadedFeeds = await window.api.getFeeds();
    setFeeds(loadedFeeds);
  };

  const loadArticles = async (feedId) => {
    console.log(feedId,'Check FeedID')
    const loadedArticles = await window.api.getArticles(feedId);
     console.log('Check Articles', loadedArticles);
    setArticles(loadedArticles);
  };

  const selectFeed = (feedId) => {
    setSelectedFeedId(feedId);
    loadArticles(feedId);
  };

  const addFeed = async (feed) => {
    try {
      await window.api.addFeed(feed);
      loadFeeds();
    } catch (err) {
      console.error('Add feed failed:', err);
    }
  };

  useEffect(() => {
    loadFeeds();
  }, []);

  return (
    <FeedContext.Provider value={{ feeds, articles, selectedFeedId, loadFeeds, selectFeed, addFeed }}>
      {children}
    </FeedContext.Provider>
  );
};