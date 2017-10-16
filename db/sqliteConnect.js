const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:', err => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
});

db.run('CREATE TABLE posts(message text, username text)', err => {
    if (err) {
        return console.error(err.message);
    }
    db.run(`INSERT INTO posts (message, username) VALUES (?, ?)`, ['is it good?', 'chestas'], function (err) {
        if (err) {
            return console.error(err.message);
        }
        console.log(`A row has been inserted with rowid ${this.lastID}`);
    });
});

module.exports = db;
