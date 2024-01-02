const express = require('express');
const cors = require('cors');
const { MongoClient } = require ('mongodb');

require('dotenv').config();

const uri = process.env.DB_CONNECTION_STRING;
const port = process.env.PORT || 8080

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(uri);

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
    console.log(req.body);
    try {
      const at = req.body;
      const con = await client.connect();
      console.log('prisijungėm prie mongodb');
      const response = await con
        .db('call_register')
        .collection('attendees')
        .insertOne(at);
      await client.close();
      res.send(response);
    } catch(error) {
      console.log('nepavyko prisijungti prie mongodb');
      res.status(400).send(error);
    }
  });

  app.post("/attendees/:id", async (req, res) => {
    console.log(req.body);
    try {
        
      const id = req.params.id;
      const at = req.body;
      const con = await client.connect();
      console.log('prisijungėm prie mongodb');
      const response = await con
        .db('call_register')
        .collection('attendees')
        .updateOne({ "_id": id }, { $set: at } );
      await client.close();
      res.send(response);
    } catch(error) {
      console.log('nepavyko prisijungti prie mongodb');
      res.status(400).send(error);
    }
  });

  app.delete("/attendees/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const con = await client.connect();
      console.log('prisijungėm prie mongodb');
      const data = await con
        .db("call_register")
        .collection("attendees")
        .deleteOne({ "_id": id });
      await con.close();
      res.send(data);
    } catch (error) {
      console.log('nepavyko prisijungti prie mongodb');
      res.status(400).send(error);
    }
  });


app.listen(port, () => console.log(`serveris veikia ant porto ${port}`));
