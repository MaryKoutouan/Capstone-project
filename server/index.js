const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

const {
getAllBootcamp,
getReview,
postBootcamp,
putReview,
putBootcamp,
deleteBootcamp
} = require('./controller')


app.get('/api/allBootcamp', getAllBootcamp)
app.get('/api/review', getReview)

app.post('/api/bootcamp', postBootcamp)
app.put('/api/review', putReview)
app.put('/api/bootcamp/', putBootcamp)
app.delete('/api/bootcamp/:id', deleteBootcamp)

app.listen(5500, () => console.log("Server running on port 5500"));