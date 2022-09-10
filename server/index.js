const express = require("express");
const cors = require("cors");
const path = require('path')
const app = express();

app.use(cors());

app.use(express.json());

const {
getAllBootcamp,
postBootcamp,
putBootcamp,
deleteBootcamp
} = require('./controller')


app.get('/api/allBootcamp', getAllBootcamp)

app.post('/api/bootcamp', postBootcamp)
app.put('/api/bootcamp/', putBootcamp)
app.delete('/api/bootcamp/', deleteBootcamp)


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/index.html'));
});


app.get('/js', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/main.js'));
});

app.get('/styles', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/css/styles.css'));
});

app.listen(5500, () => console.log("Server running on port 5500"));