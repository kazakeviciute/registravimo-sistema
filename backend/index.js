const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
const port = process.env.PORT || 8080
const fruits = ['apple']

app.get("/", (req, res) => {
    res.send(fruits);
});

app.listen(port, () => console.log(`serveris veikia ant porto ${port}`));
