# RSS Reader App

A modern, desktop-based RSS Reader application built using **Electron**, **React**, and **SQLite**, inspired by the clean UI of **Raven Reader**. This application enables users to manage RSS feeds, read articles offline, and navigate through a minimal and intuitive interface powered by **Ant Design**.

---

## Features

- Add and manage RSS feeds with ease  
- Offline reading supported via local SQLite database  
- Clean, Raven Reader–style layout with sidebar and main article view  
- Planned enhancements: dark mode, search functionality, and OPML import/export  
- Built with performance and usability in mind

---

## Tech Stack

| Frontend       | Backend / Storage | UI Framework | Additional Tools |
|----------------|-------------------|--------------|------------------|
| React          | SQLite            | Ant Design   | Electron         |
| Context API    | Node.js (IPC)     | Custom Icons | RSS Parser       |

---

## Folder Structure

rss-reader-app/
├── public/
├── src/
│ ├── components/
│ ├── context/ # FeedContext for global state
│ ├── db/ # SQLite DB handling
│ ├── preload.js # Electron preload script for IPC
│ ├── main.js # Electron entry point
│ └── App.jsx
├── package.json
└── README.md

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/pavithra-elumalai/rss-reader-app.git
cd rss-reader-app

## Getting Started

### 2. Install Dependencies

```bash
npm install


### 3. Run the App in Development Mode

```bash
npm run electron:dev


## RSS Parsing and Offline Support

The app fetches articles from RSS feeds using a parser and stores them in a local SQLite database via Electron’s IPC bridge. This allows for offline reading and persistence between sessions.

---

## Roadmap

- [ ] Dark mode support  
- [ ] Article/feed search functionality  
- [ ] Auto-refresh for new articles  
- [ ] OPML import/export support

---

## Author

**Pavithra Elumalai**  
GitHub: [pavithra-elumalai](https://github.com/pavithra-elumalai)  
MERN Stack Developer with 3.8+ years of experience

