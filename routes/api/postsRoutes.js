const router = require('express').Router();
const postsService = require('../../services/postsService');

router.get('/', (req, res) => {
    postsService.getPosts((err, data) => {
        if (!err) {
            res.data = data;
            res.json(data);
        } else {
            res.status(400);
            res.json(err);
        }
    });
})

router.post('/', (req, res) => {
    postsService.insertPost(req.body, (err, data) => {
        if (!err) {
            res.data = data;
            res.json(data);
        } else {
            res.status(400);
            res.json(err);
        }
    })
})

module.exports = router;
