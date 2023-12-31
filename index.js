const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require('dotenv').config();
const galary = require('./galary.json');
const app = express();
const port = process.env.PORT || 5000;


// middleWere 
app.use(express.json());
const corsConfig = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
  app.use(cors(corsConfig))

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

const toyCollection =client.db("toys").collection("toyCollection")
const addToyCollection =client.db("toy").collection("addToyCollection")


async function run() {

  app.get('/toys', async (req, res) => {
    const cursor = toyCollection.find();
    const rrsrrs = await cursor.toArray();
    res.send(rrsrrs);
  });
 
  try {
    // Connect the client to the server	(optional starting in v4.7)
    //  client.connect();


    app.get('/to',async(req,res)=>{
      const id =req.query.id;
      // console.log(id);
      const query ={_id:new ObjectId(id)};
      const options = {
        projection: { picture: 1, name: 1,description:1,sellerName:1,categories:1,
          price:1,rating:1 },
      };
      const cursor =await toyCollection.findOne(query,options)
      // const rrsrrs =await cursor;
      res.send(cursor)
     })
    


    app.get('/toys/:categorie', async(req, res) => {
      const categorie = req.params.categorie;
      // console.log(categorie);
      const query = { categories: `${categorie}`};
      const cursor = toyCollection.find(query);
      const rrsrrs = await cursor.toArray();
      res.send(rrsrrs);

    })

    
    

    // toy
    
    app.get('/toy', async(req, res) => {
      // console.log(req.query.email);
      const query ={email:`${req.query.email}`};
      const cursor =addToyCollection.find(query)
      const rrsrrs =await cursor.toArray();
      res.send(rrsrrs)
    })

    
  
   
    app.post('/toy', async(req, res) => {
      const toy = req.body;
      // console.log(toy);
      const rrsrrs = await addToyCollection.insertOne(toy);
      res.send(rrsrrs);
    })
    app.delete('/toy/:id',async(req,res)=>{
      const id =req.params.id;
      const query={_id:new ObjectId(id)}
      const rrsrrs =await addToyCollection.deleteOne(query);
      res.send(rrsrrs);

    })
    app.patch('/toy/:id', async(req,res)=>{
      const id =req.params.id;
      const filter = {_id:new ObjectId(id)};
      const updateToys =req.body;
      const updateDoc = {
        $set: {
          status: updateToys.status
        },
      };
      const rrsrrs = await addToyCollection.updateOne(filter,updateDoc)
      res.send(rrsrrs)
    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send("Avengers is running")
})
app.get('/galary', (req, res) => {
  res.send(galary);
})

app.listen(port, () => {
  console.log(`Avengers running on ${port}`);
})