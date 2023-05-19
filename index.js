const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const galary =require('./galary.json');
const app =express();
const port =process.env.PORT ||5000;

// middleWere 
app.use(express.json());
app.use(cors());

//

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3kcnoe6.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {


  const toyCollection=client.db("toys").collection("toyCollection")

  app.get('/toys',async(req,res)=>{
    const cursor=toyCollection.find();
    const result=await cursor.toArray();
    res.send(result);
  })


  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/',(req,res)=>{
    res.send("Avengers is running")
})
app.get('/galary',(req,res)=>{
    res.send(galary)
})

app.listen(port,()=>{
    console.log(`Avengers running on ${port}`);
})