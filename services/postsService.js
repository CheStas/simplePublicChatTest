const Post = require('./../db/sqliteConnect');

module.exports = {
    getPosts: (cb) => {
        const error = null;
        Post.findAll()
            .then(posts => {
                cb(null, posts);
            })
            .catch(err => {
                error = new Error(err.message);
                cb(error);
            })
    },

    insertPost: (data, cb) => {
        const error = null,
            text = data.message,
            username = data.username;

        if (checkTextLength(text) && checkUsername(username)) {
            Post.create({
                message: text,
                username: username
            })
                .then(posts => {
                    console.log('post added');
                    cb(error);
                })
                .catch(err => {
                    error = new Error(err.message);
                    cb(error);
                });
        } else {
            cb(new Error('not valid data'));
        }
    }
};

function checkUsername(username) {
    return username.split('').every(el => el.match(/[A-Za-z0-9]/));
}

function checkTextLength(text) {
    return text.length < 200;
}
