const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 4000;

// Middleware /body-parser
app.use(cors());
app.use(express.json());

// KNelor2YToXsEPn0
// sakhanDB

// Mongodb CONNECTION - URI 
const uri = `mongodb+srv://sakhanDB:KNelor2YToXsEPn0@cluster0.xwklikq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    //To Create and connection to the "MyDatabaseForClient" database and access it's collection named "Files".
    const database = client.db("SakhanDatabase");
    const usersCollection = database.collection("user");

    app.get('/user', async (req, res) => {
        try {
            // Get the email from the query parameters
            // const email = req.query.email;
    
            // Query the database to find the user with the specified email
            // const user = await usersCollection.findOne({ email });
            const user = await usersCollection.findOne({});
            console.log("U:", user)
    
            // Check if user exists
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            // Send a success response with the user data in JSON format
            res.json(user);
        } catch (err) {
            // If an error occurs, send a 500 status code along with the error message
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        }
    })

    // POST method to post user's data in mongodb with their emailId and Pass!
    app.post('/users', async (req, res) => {
    const doc = {
        email: req.body.email,
        password: req.body.password,
    }
      const result = await usersCollection.insertOne(doc);
      console.log(`A document was inserted with the _id: ${result.insertedId}`);
      res.json(`Success, id: ${result.insertedId}`)
  });
  
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);


// GET API - home 
app.get('/', (req, res) => {
  res.send("Hello from S.A.S local server page!!");
});
app.listen(port, () => {
  console.log(`Listening on my port : ${port}`)
});