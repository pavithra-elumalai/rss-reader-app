const Database = require('better-sqlite3');
const db = new Database('./feeds.db');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS feeds (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    link TEXT UNIQUE,
    image TEXT,
    publishedAt TEXT,
    source TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    feedId INTEGER,
    title TEXT,
    link TEXT,
    image TEXT,
    description TEXT,
    publishedAt TEXT,
    FOREIGN KEY(feedId) REFERENCES feeds(id)
  )
`);


const insertDefaultFeeds = () => {
  const existingFeeds = db.prepare("SELECT * FROM feeds").all();
  if (existingFeeds.length === 0) {
    const insert = db.prepare("INSERT INTO feeds (title, link, image, publishedAt, source) VALUES (?, ?, ?, ?, ?)");
    insert.run(
      "Hacker News",
      "https://news.ycombinator.com/rss",
      "",
      new Date().toISOString(), 
      "Hacker News" 
    );
    console.log("Inserted default feed: Hacker News");
  }
};

insertDefaultFeeds();

module.exports = db;
