const database = require('./database');
const express = require("express");
const app = express();
const path = require('path');
const port = 5555;
// http://localhost:5555
// http://localhost:5555/get-user/

app.use(express.json({extended: false})); // bodyparser : intégré dans le express donc plus besoin de le faire

app.use(express.static(__dirname + '/public', {
    extensions: ['html']
}));

app.post('/user', (req, res) => {
    console.log(req.body);
    // res.sendFile(path.join(__dirname + '/index.html'));
    database.createUser((err, dataset) /* ici se trouve le callback */ => {
      res.send(dataset);
    }, req.body /* ici se trouve les datas */ ); // post datas ici ...
});

app.delete('/user', (req, res) => {
    console.log(req.body);
    database.deleteUser((err, dataset) => {
      res.send(dataset);
    }, req.body);
});

app.get('/user', function(req, res) {
    console.log("tout va bien jusqu'ici");
    database.getUser(null, users => {
    res.send(users);
    });
});

app.patch('/user', function(req, res) {


});


app.listen(port, function() {
    console.log(`Example app listening on port => http://localhost:${port}`);
    // console.log('Example app listening on port' + port);
});

