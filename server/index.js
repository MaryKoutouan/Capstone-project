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

app.listen(5500, () => console.log("Server running on port 5500"));