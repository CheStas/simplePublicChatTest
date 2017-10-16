const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

http.listen(3000, () => {
    console.log('listening on :3000');
});

app.use(express.static(__dirname + '/public'));
const routes = require('./routes/api/routes')(app);
