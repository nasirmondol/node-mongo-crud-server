const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// user: userdatabasepractice
// pass: rH6n6LdhB86YCoSg


const uri = "mongodb+srv://userdatabasepractice:rH6n6LdhB86YCoSg@cluster0.r0i0e.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
      const database = client.db("maninfo");
      const usersCollection = database.collection("users");

    //   GET API
    app.get('/users', async(req, res) =>{
        const cursor = usersCollection.find({});
        const users = await cursor.toArray();
        res.send(users)
    });

    // DELETE API
      app.delete('/users/:id', async(req, res) =>{
        const id = req.params.id;
        const cursor = {_id: ObjectId(id)};
        const result = await usersCollection.deleteOne(cursor);
        console.log('deleted user with action', result)
        res.send(result);
      });

      // UPDATA THE USERS
        app.get('/users/:id', async(req, res) =>{
          const id = req.params.id;
          const query = {_id: ObjectId(id)}
          const user = await usersCollection.findOne(query);
          res.send(user);
        })

    // POST API
      app.post('/users' , async (req, res) =>{
        const newUsers = req.body;
        const result = await usersCollection.insertOne(newUsers);
        console.log('Hitting the post', result);
        res.json(result)
      } )
     
    } 
    finally {
        // await client.close();
    }
  }
  run().catch(console.dir);
  

app.get('/', (req, res)=>{
    res.send('Running on the CRUD server')
})

app.listen(port, () =>{
    console.log('Listen to the port', port)
})