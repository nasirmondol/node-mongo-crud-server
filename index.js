const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json())


// users: Salmans_File
// pass: Rg0tXzEmvYl9KUzK


const uri = "mongodb+srv://Salmans_File:Rg0tXzEmvYl9KUzK@cluster0.r0i0e.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    const database = client.db("Salmans_File");
    const usersCollection = database.collection("katrina");

    // GET API
    app.get('/users', async(req, res) =>{
      const cursor = usersCollection.find({});
      const users = await cursor.toArray();
      res.send(users);
    });

    // DELETE API
    app.delete('/users/:id', async (req,res)=>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await usersCollection.deleteOne(query);
      // console.log(id)
      res.json(result)
    });

  
    app.get('/users/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)}
      const user = await usersCollection.findOne(query)
      console.log('User loading with id', id);
      res.send(user);
    });

    // UPDATE API
    app.put('/users/:id', async(req, res) =>{
      const id = req.params.id;
      const updateUser = req.body;
      const filter = {_id: ObjectId(id)};
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: updateUser.name,
          email: updateUser.email
        },
      };
      const result = await usersCollection.updateOne(filter, updateDoc, options);
      // console.log('update the user id', req)
      res.json(result)
    })

    // POST API
    app.post('/users' , async (req, res) =>{
      const newUsers = req.body;
      const result = await usersCollection.insertOne(newUsers);
      console.log('Hitting the post', result);
      res.json(result)
    } );
    
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) =>{
  res.send('Running the database server')
})

app.listen(port, () =>{
    console.log('listening to the port', port)
})