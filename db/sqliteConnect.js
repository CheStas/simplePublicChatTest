const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
    $all: Op.all,
};

const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    operatorsAliases,

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    storage: ':memory:'
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const Post = sequelize.define('post', {
    message: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    }
});

Post
    .sync({ force: true })
    .then(() => {
        return Post.create({
            message: 'is it good?',
            username: 'chestas'
        })
    })
    .then(() => {
        return Post.findAll()
    })
    .then(posts => {
        console.log(posts)
    });

module.exports = Post;
