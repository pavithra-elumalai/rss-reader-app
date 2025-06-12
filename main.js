const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Database = require('better-sqlite3');
const Parser = require('rss-parser');
const parser = new Parser();

let db;

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    }
  });

  win.loadURL('http://localhost:3000');
}

function ensureTables() {
  db = new Database(path.join(__dirname, 'rss.db'));

  db.prepare(`
    CREATE TABLE IF NOT EXISTS feeds (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      link TEXT
    )
  `).run();

  // Check if 'articles' table exists with correct columns
  const tableInfo = db.prepare(`PRAGMA table_info(articles)`).all();
  const hasLinkColumn = tableInfo.some(col => col.name === 'link');
  const hasPublishedAtColumn = tableInfo.some(col => col.name === 'publishedAt');

  if (!hasLinkColumn || !hasPublishedAtColumn) {
    console.warn('Recreating articles table to ensure required columns exist...');
    db.prepare(`DROP TABLE IF EXISTS articles`).run();
  }

  db.prepare('DELETE FROM articles').run();
db.prepare('DELETE FROM feeds').run();

  db.prepare(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      feedId INTEGER,
      title TEXT,
      link TEXT,
      content TEXT,
      publishedAt TEXT
    )
  `).run();
}

app.whenReady().then(() => {
  ensureTables();
  createWindow();
});

ipcMain.handle('get-feeds', () => {
  return db.prepare('SELECT * FROM feeds').all();
});

ipcMain.handle('get-articles', (event, feedId) => {
  return db.prepare('SELECT * FROM articles WHERE feedId = ? ORDER BY publishedAt DESC').all(feedId);
});

ipcMain.handle('add-feed', async (event, feed) => {
  try {
    const insertFeedStmt = db.prepare('INSERT INTO feeds (title, link) VALUES (?, ?)');
    const result = insertFeedStmt.run(feed.title, feed.link);
    const feedId = result.lastInsertRowid;

    const parsedFeed = await parser.parseURL(feed.link);

    const insertArticleStmt = db.prepare(`
      INSERT INTO articles (feedId, title, link, content, publishedAt)
      VALUES (?, ?, ?, ?, ?)
    `);

    const insertMany = db.transaction((items) => {
      for (const item of items) {
        insertArticleStmt.run(
          feedId,
          item.title || 'No Title',
          item.link || '',
          item.contentSnippet || item.content || '',
          item.publishedAt || new Date().toISOString()
        );
      }
    });

    insertMany(parsedFeed.items);

    return { success: true };
  } catch (err) {
    console.error('Failed to add feed and fetch articles:', err);
    return { success: false, error: err.message };
  }
});
