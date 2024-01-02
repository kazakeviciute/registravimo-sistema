const express = require('express');
const cors = require('cors');
const {MongoClient} = require ('mongodb');

require('dotenv').config();

const uri = process.env.DB_CONNECTION_STRING;
const port = process.env.PORT || 8080

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri);


//const fruits = [{_id: "123456", name: "Apple"}]

//app.get("/fruits", (req, res) => {
//    res.send(fruits);
//});

//app.post("/fruits", (req, res) => {
 //   const fruit = req.body;
 //   const newFruit = { ...fruit, _id: Date.now().toString() }
 //   fruits.push(fruit);
 //   console.log(fruit);
 //   res.send(newFruit);
//});

app.get("/attendees", async (req, res) => {
  try {
    const con = await client.connect();
    console.log('prisijungėm prie mongodb');
    const response = await con.db('call_register').collection('attendees').find().toArray();
    await client.close();
    res.send(response);
  } catch(error) {
    console.log('nepavyko prisijungti prie mongodb');
    res.status(400).send(error);
  }
});

app.post("/attendees", async (req, res) => {
    try {
      const at = req.body;
      //const newAttendee = {...attendee, vardas: "Pelėda"};
      const con = await client.connect();
      console.log('prisijungėm prie mongodb');
      const response = await con.db('call_register').collection('attendees').insertOne(at);
      await client.close();
      res.send(response);
    } catch(error) {
      console.log('nepavyko prisijungti prie mongodb');
      res.status(400).send(error);
    }
  });
  
app.listen(port, () => console.log(`serveris veikia ant porto ${port}`));
