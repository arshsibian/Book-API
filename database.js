const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database
const db = new sqlite3.Database(':memory:');

// Create the book table
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        author TEXT,
        year INTEGER
    )`);
});

module.exports = db;