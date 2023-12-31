const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080
const fruits = [{_id: "123456", name: "Apple"}]

app.get("/fruits", (req, res) => {
    res.send(fruits);
});

app.post("/fruits", (req, res) => {
    const fruit = req.body;
    const newFruit = { ...fruit, _id: Date.now().toString() }
    fruits.push(fruit);
    console.log(fruit);
    res.send(newFruit);
});

app.listen(port, () => console.log(`serveris veikia ant porto ${port}`));
