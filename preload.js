const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  getFeeds: () => ipcRenderer.invoke('get-feeds'),
  getArticles: (feedId) => ipcRenderer.invoke('get-articles', feedId),
  addFeed: (feed) => ipcRenderer.invoke('add-feed', feed),
});