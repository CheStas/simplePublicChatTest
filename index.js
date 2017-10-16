const express = require('express'),
    app = express(),
    http = require('http').Server(app),
    bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

http.listen(process.env.PORT || 3000, function () {
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

app.use(express.static(__dirname + '/public'));
const routes = require('./routes/api/routes')(app);
