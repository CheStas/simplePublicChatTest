const db = require('./../db/sqliteConnect');

module.exports = {
    getPosts: (cb) => {
        const err = null,
            sql = `SELECT message message, username username FROM posts`;

        db.all(sql, [], (error, rows) => {
            if (error) {
                err = new Error(error.message);
            }
            cb(err, rows);
        });
    },

    insertPost: (data, cb) => {
        const err = null,
            text = data.message,
            username = data.username;

        if (checkTextLength(text) && checkUsername(username)) {
            db.run(`INSERT INTO posts (message, username) VALUES (?, ?)`, [text, username], function (error) {
                if (error) {
                    err = new Error(error.message);
                } else {
                    console.log(`A row has been inserted with rowid ${this.lastID}`);
                }
                cb(err);
            });
        } else {
            cb('not valid data');
        }
    }
};

function checkUsername(username) {
    return username.split('').every(el => el.match(/[A-Za-z0-9]/));
}

function checkTextLength(text) {
    return text.length < 200;
}
