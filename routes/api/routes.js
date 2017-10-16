const postsRoutes = require('./postsRoutes');

module.exports = function (app) {
    app.use('/api/posts', postsRoutes);
};
